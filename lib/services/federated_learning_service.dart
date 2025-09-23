import 'dart:convert';
import 'dart:typed_data';
import 'dart:math';
import 'package:crypto/crypto.dart';
import 'package:uuid/uuid.dart';

import '../models/user_feedback.dart';
import '../models/cry_analysis.dart';
import 'storage_service.dart';
import 'ai_service.dart';

/// Federated Learning servisi - Kullanıcı verilerini cihazda tutarak
/// model iyileştirmesi sağlar
class FederatedLearningService {
  static const String _deviceId = 'device_id';
  static const int _minFeedbackForUpdate = 10;
  static const int _maxFeedbackBatch = 50;
  static const Duration _updateInterval = Duration(days: 7);
  
  static bool _isInitialized = false;
  static String? _uniqueDeviceId;
  static DateTime? _lastUpdate;
  
  /// Servisi başlat
  static Future<void> initialize() async {
    if (_isInitialized) return;
    
    try {
      // Benzersiz cihaz ID'si oluştur veya yükle
      _uniqueDeviceId = StorageService.getSetting<String>(_deviceId);
      if (_uniqueDeviceId == null) {
        _uniqueDeviceId = const Uuid().v4();
        await StorageService.saveSetting(_deviceId, _uniqueDeviceId);
      }
      
      // Son güncelleme zamanını yükle
      final lastUpdateStr = StorageService.getSetting<String>('last_fl_update');
      if (lastUpdateStr != null) {
        _lastUpdate = DateTime.parse(lastUpdateStr);
      }
      
      _isInitialized = true;
      print('Federated Learning Service başlatıldı');
      
      // Otomatik güncelleme kontrolü
      _schedulePeriodicUpdates();
    } catch (e) {
      print('Federated Learning başlatma hatası: $e');
      rethrow;
    }
  }
  
  /// Kullanıcı geri bildirimiyle modeli yerel olarak güncelle
  static Future<void> updateModelWithFeedback(FeedbackData feedback) async {
    if (!_isInitialized) await initialize();
    
    try {
      // Geri bildirim verilerini hazırla
      final trainingData = await _prepareFeedbackForTraining([feedback]);
      
      // Yerel model güncellemesi
      await _performLocalModelUpdate(trainingData);
      
      // Geri bildirimi eğitimde kullanıldı olarak işaretle
      await StorageService.markFeedbackAsUsed(feedback.id);
      
      print('Model geri bildirimle güncellendi: ${feedback.id}');
    } catch (e) {
      print('Model güncelleme hatası: $e');
    }
  }
  
  /// Toplu geri bildirimlerle model güncelleme
  static Future<void> updateModelWithBatchFeedback() async {
    if (!_isInitialized) await initialize();
    
    try {
      // Eğitimde kullanılmamış geri bildirimleri al
      final pendingFeedback = StorageService.getFeedbackForTraining();
      
      if (pendingFeedback.length < _minFeedbackForUpdate) {
        print('Yetersiz geri bildirim sayısı: ${pendingFeedback.length}');
        return;
      }
      
      // Batch boyutunu sınırla
      final feedbackBatch = pendingFeedback.take(_maxFeedbackBatch).toList();
      
      // Eğitim verilerini hazırla
      final trainingData = await _prepareFeedbackForTraining(feedbackBatch);
      
      // Yerel model güncellemesi
      await _performLocalModelUpdate(trainingData);
      
      // Kullanılan geri bildirimleri işaretle
      for (final feedback in feedbackBatch) {
        await StorageService.markFeedbackAsUsed(feedback.id);
      }
      
      // Son güncelleme zamanını kaydet
      _lastUpdate = DateTime.now();
      await StorageService.saveSetting('last_fl_update', _lastUpdate!.toIso8601String());
      
      print('Model ${feedbackBatch.length} geri bildirimle güncellendi');
      
      // Anonimleşmiş model güncellemelerini hazırla (opsiyonel)
      await _prepareAnonymizedModelUpdate(trainingData);
    } catch (e) {
      print('Toplu model güncelleme hatası: $e');
    }
  }
  
  /// Geri bildirim verilerini eğitim formatına çevir
  static Future<TrainingData> _prepareFeedbackForTraining(List<FeedbackData> feedbackList) async {
    final correctPredictions = <TrainingExample>[];
    final incorrectPredictions = <TrainingExample>[];
    
    for (final feedback in feedbackList) {
      try {
        // İlgili analizi bul
        final analyses = StorageService.getAllAnalyses();
        final analysis = analyses.firstWhere((a) => a.id == feedback.analysisId);
        
        final example = TrainingExample(
          features: analysis.features,
          predictedType: analysis.cryType,
          actualType: feedback.correctedType ?? analysis.cryType,
          confidence: analysis.confidence,
          satisfactionRating: feedback.satisfactionRating,
          wasAccurate: feedback.wasAccurate,
        );
        
        if (feedback.wasAccurate) {
          correctPredictions.add(example);
        } else {
          incorrectPredictions.add(example);
        }
      } catch (e) {
        print('Geri bildirim hazırlama hatası: $e');
        continue;
      }
    }
    
    return TrainingData(
      correctPredictions: correctPredictions,
      incorrectPredictions: incorrectPredictions,
      deviceId: _uniqueDeviceId!,
      timestamp: DateTime.now(),
    );
  }
  
  /// Yerel model güncellemesi gerçekleştir
  static Future<void> _performLocalModelUpdate(TrainingData trainingData) async {
    try {
      // Eğitim istatistiklerini hesapla
      final stats = _calculateTrainingStatistics(trainingData);
      
      // Model ağırlık güncellemelerini hesapla
      final weightUpdates = _calculateWeightUpdates(trainingData);
      
      // AI servisine model güncelleme bilgilerini gönder
      await AIService.updateModelWithFeedback(
        trainingData.correctPredictions.map((e) => FeedbackData(
          id: const Uuid().v4(),
          analysisId: '',
          wasAccurate: true,
          correctedType: e.actualType,
          satisfactionRating: e.satisfactionRating,
          suggestionWasHelpful: true,
          createdAt: DateTime.now(),
        )).toList() + 
        trainingData.incorrectPredictions.map((e) => FeedbackData(
          id: const Uuid().v4(),
          analysisId: '',
          wasAccurate: false,
          correctedType: e.actualType,
          satisfactionRating: e.satisfactionRating,
          suggestionWasHelpful: false,
          createdAt: DateTime.now(),
        )).toList()
      );
      
      // Güncelleme istatistiklerini kaydet
      await _saveUpdateStatistics(stats);
      
      print('Yerel model güncellendi: ${stats.totalSamples} örnek');
    } catch (e) {
      print('Yerel model güncelleme hatası: $e');
      rethrow;
    }
  }
  
  /// Eğitim istatistiklerini hesapla
  static TrainingStatistics _calculateTrainingStatistics(TrainingData trainingData) {
    final totalSamples = trainingData.correctPredictions.length + trainingData.incorrectPredictions.length;
    final accuracy = trainingData.correctPredictions.length / totalSamples;
    
    // Ağlama türü dağılımı
    final typeDistribution = <CryType, int>{};
    for (final example in [...trainingData.correctPredictions, ...trainingData.incorrectPredictions]) {
      typeDistribution[example.actualType] = (typeDistribution[example.actualType] ?? 0) + 1;
    }
    
    // Ortalama memnuniyet skoru
    final satisfactionScores = [...trainingData.correctPredictions, ...trainingData.incorrectPredictions]
        .map((e) => e.satisfactionRating.toDouble()).toList();
    final averageSatisfaction = satisfactionScores.reduce((a, b) => a + b) / satisfactionScores.length;
    
    return TrainingStatistics(
      totalSamples: totalSamples,
      accuracy: accuracy,
      typeDistribution: typeDistribution,
      averageSatisfaction: averageSatisfaction,
      timestamp: DateTime.now(),
    );
  }
  
  /// Model ağırlık güncellemelerini hesapla
  static Map<String, List<double>> _calculateWeightUpdates(TrainingData trainingData) {
    // Basitleştirilmiş ağırlık güncelleme algoritması
    // Gerçek uygulamada daha karmaşık federated averaging kullanılır
    
    final weightUpdates = <String, List<double>>{};
    
    // Doğru tahminler için pozitif güncelleme
    for (final example in trainingData.correctPredictions) {
      final typeIndex = example.actualType.index;
      final updateKey = 'layer_output_$typeIndex';
      
      if (!weightUpdates.containsKey(updateKey)) {
        weightUpdates[updateKey] = List.filled(6, 0.0); // 6 ağlama türü
      }
      
      // Güven skoruna göre pozitif güncelleme
      weightUpdates[updateKey]![typeIndex] += example.confidence * 0.1;
    }
    
    // Yanlış tahminler için negatif güncelleme
    for (final example in trainingData.incorrectPredictions) {
      final predictedIndex = example.predictedType.index;
      final actualIndex = example.actualType.index;
      
      final updateKey = 'layer_output_$predictedIndex';
      if (!weightUpdates.containsKey(updateKey)) {
        weightUpdates[updateKey] = List.filled(6, 0.0);
      }
      
      // Yanlış tahmini azalt, doğru tahmini artır
      weightUpdates[updateKey]![predictedIndex] -= example.confidence * 0.05;
      weightUpdates[updateKey]![actualIndex] += example.confidence * 0.05;
    }
    
    return weightUpdates;
  }
  
  /// Anonimleşmiş model güncellemelerini hazırla
  static Future<void> _prepareAnonymizedModelUpdate(TrainingData trainingData) async {
    try {
      // Kişisel verileri çıkar, sadece model parametrelerini tut
      final anonymizedUpdate = {
        'device_hash': _hashDeviceId(_uniqueDeviceId!),
        'update_weights': _calculateWeightUpdates(trainingData),
        'sample_count': trainingData.correctPredictions.length + trainingData.incorrectPredictions.length,
        'accuracy': trainingData.correctPredictions.length / 
            (trainingData.correctPredictions.length + trainingData.incorrectPredictions.length),
        'timestamp': DateTime.now().toIso8601String(),
      };
      
      // Anonimleşmiş güncellemeyi yerel olarak sakla
      // Gerçek uygulamada bu güncelleme sunucuya gönderilebilir
      await StorageService.saveSetting('last_anonymized_update', jsonEncode(anonymizedUpdate));
      
      print('Anonimleşmiş model güncellemesi hazırlandı');
    } catch (e) {
      print('Anonimleşmiş güncelleme hatası: $e');
    }
  }
  
  /// Güncelleme istatistiklerini kaydet
  static Future<void> _saveUpdateStatistics(TrainingStatistics stats) async {
    final statsData = {
      'total_samples': stats.totalSamples,
      'accuracy': stats.accuracy,
      'type_distribution': stats.typeDistribution.map((k, v) => MapEntry(k.name, v)),
      'average_satisfaction': stats.averageSatisfaction,
      'timestamp': stats.timestamp.toIso8601String(),
    };
    
    await StorageService.saveSetting('fl_statistics', jsonEncode(statsData));
  }
  
  /// Cihaz ID'sini hash'le (gizlilik için)
  static String _hashDeviceId(String deviceId) {
    final bytes = utf8.encode(deviceId + 'baby_cry_salt');
    final digest = sha256.convert(bytes);
    return digest.toString().substring(0, 16); // İlk 16 karakter
  }
  
  /// Periyodik güncellemeleri planla
  static void _schedulePeriodicUpdates() {
    // Her gün kontrol et
    Stream.periodic(const Duration(hours: 24)).listen((_) async {
      if (_shouldPerformUpdate()) {
        await updateModelWithBatchFeedback();
      }
    });
  }
  
  /// Güncelleme yapılıp yapılmayacağını kontrol et
  static bool _shouldPerformUpdate() {
    if (_lastUpdate == null) return true;
    
    final timeSinceLastUpdate = DateTime.now().difference(_lastUpdate!);
    return timeSinceLastUpdate >= _updateInterval;
  }
  
  /// Federated Learning istatistiklerini getir
  static Map<String, dynamic> getStatistics() {
    try {
      final statsStr = StorageService.getSetting<String>('fl_statistics');
      if (statsStr != null) {
        return jsonDecode(statsStr);
      }
      return {};
    } catch (e) {
      print('İstatistik getirme hatası: $e');
      return {};
    }
  }
  
  /// Servisi temizle
  static void dispose() {
    _isInitialized = false;
    _uniqueDeviceId = null;
    _lastUpdate = null;
  }
}

/// Eğitim verisi sınıfı
class TrainingData {
  final List<TrainingExample> correctPredictions;
  final List<TrainingExample> incorrectPredictions;
  final String deviceId;
  final DateTime timestamp;
  
  TrainingData({
    required this.correctPredictions,
    required this.incorrectPredictions,
    required this.deviceId,
    required this.timestamp,
  });
}

/// Eğitim örneği sınıfı
class TrainingExample {
  final Map<String, double> features;
  final CryType predictedType;
  final CryType actualType;
  final double confidence;
  final int satisfactionRating;
  final bool wasAccurate;
  
  TrainingExample({
    required this.features,
    required this.predictedType,
    required this.actualType,
    required this.confidence,
    required this.satisfactionRating,
    required this.wasAccurate,
  });
}

/// Eğitim istatistikleri sınıfı
class TrainingStatistics {
  final int totalSamples;
  final double accuracy;
  final Map<CryType, int> typeDistribution;
  final double averageSatisfaction;
  final DateTime timestamp;
  
  TrainingStatistics({
    required this.totalSamples,
    required this.accuracy,
    required this.typeDistribution,
    required this.averageSatisfaction,
    required this.timestamp,
  });
}