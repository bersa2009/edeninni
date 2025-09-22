import 'package:hive_flutter/hive_flutter.dart';
import '../models/cry_analysis.dart';
import '../models/user_feedback.dart';

class StorageService {
  static late Box<CryAnalysis> _analysisBox;
  static late Box<FeedbackData> _feedbackBox;
  static late Box _settingsBox;
  
  static const String _analysisBoxName = 'cry_analyses';
  static const String _feedbackBoxName = 'user_feedback';
  static const String _settingsBoxName = 'app_settings';
  
  static bool _isInitialized = false;
  
  static Future<void> initialize() async {
    if (_isInitialized) return;
    
    try {
      // Hive kutularını aç
      _analysisBox = await Hive.openBox<CryAnalysis>(_analysisBoxName);
      _feedbackBox = await Hive.openBox<FeedbackData>(_feedbackBoxName);
      _settingsBox = await Hive.openBox(_settingsBoxName);
      
      _isInitialized = true;
      print('StorageService başarıyla başlatıldı');
    } catch (e) {
      print('StorageService başlatma hatası: $e');
      rethrow;
    }
  }
  
  // Analiz kaydetme
  static Future<void> saveAnalysis(CryAnalysis analysis) async {
    try {
      await _analysisBox.put(analysis.id, analysis);
    } catch (e) {
      print('Analiz kaydetme hatası: $e');
      rethrow;
    }
  }
  
  // Analizleri getirme
  static List<CryAnalysis> getAllAnalyses() {
    try {
      return _analysisBox.values.toList()
        ..sort((a, b) => b.timestamp.compareTo(a.timestamp));
    } catch (e) {
      print('Analizleri getirme hatası: $e');
      return [];
    }
  }
  
  // Belirli tarih aralığındaki analizleri getirme
  static List<CryAnalysis> getAnalysesByDateRange(DateTime start, DateTime end) {
    try {
      return _analysisBox.values
          .where((analysis) => 
              analysis.timestamp.isAfter(start) && 
              analysis.timestamp.isBefore(end))
          .toList()
        ..sort((a, b) => b.timestamp.compareTo(a.timestamp));
    } catch (e) {
      print('Tarih aralığı analizi hatası: $e');
      return [];
    }
  }
  
  // Analizi güncelleme
  static Future<void> updateAnalysis(CryAnalysis analysis) async {
    try {
      await _analysisBox.put(analysis.id, analysis);
    } catch (e) {
      print('Analiz güncelleme hatası: $e');
      rethrow;
    }
  }
  
  // Analizi silme
  static Future<void> deleteAnalysis(String analysisId) async {
    try {
      await _analysisBox.delete(analysisId);
    } catch (e) {
      print('Analiz silme hatası: $e');
      rethrow;
    }
  }
  
  // Geri bildirim kaydetme
  static Future<void> saveFeedback(FeedbackData feedback) async {
    try {
      await _feedbackBox.put(feedback.id, feedback);
    } catch (e) {
      print('Geri bildirim kaydetme hatası: $e');
      rethrow;
    }
  }
  
  // Geri bildirimleri getirme
  static List<FeedbackData> getAllFeedback() {
    try {
      return _feedbackBox.values.toList()
        ..sort((a, b) => b.createdAt.compareTo(a.createdAt));
    } catch (e) {
      print('Geri bildirimleri getirme hatası: $e');
      return [];
    }
  }
  
  // Eğitimde kullanılacak geri bildirimleri getirme
  static List<FeedbackData> getFeedbackForTraining() {
    try {
      return _feedbackBox.values
          .where((feedback) => !feedback.isUsedForTraining)
          .toList();
    } catch (e) {
      print('Eğitim geri bildirimi hatası: $e');
      return [];
    }
  }
  
  // Geri bildirim eğitimde kullanıldı olarak işaretle
  static Future<void> markFeedbackAsUsed(String feedbackId) async {
    try {
      final feedback = _feedbackBox.get(feedbackId);
      if (feedback != null) {
        final updatedFeedback = FeedbackData(
          id: feedback.id,
          analysisId: feedback.analysisId,
          wasAccurate: feedback.wasAccurate,
          correctedType: feedback.correctedType,
          satisfactionRating: feedback.satisfactionRating,
          suggestionWasHelpful: feedback.suggestionWasHelpful,
          additionalComments: feedback.additionalComments,
          createdAt: feedback.createdAt,
          isUsedForTraining: true,
        );
        await _feedbackBox.put(feedbackId, updatedFeedback);
      }
    } catch (e) {
      print('Geri bildirim işaretleme hatası: $e');
      rethrow;
    }
  }
  
  // Ayarlar
  static Future<void> saveSetting(String key, dynamic value) async {
    try {
      await _settingsBox.put(key, value);
    } catch (e) {
      print('Ayar kaydetme hatası: $e');
      rethrow;
    }
  }
  
  static T? getSetting<T>(String key, {T? defaultValue}) {
    try {
      return _settingsBox.get(key, defaultValue: defaultValue) as T?;
    } catch (e) {
      print('Ayar getirme hatası: $e');
      return defaultValue;
    }
  }
  
  // İstatistikler
  static Map<String, dynamic> getAnalysisStatistics() {
    try {
      final analyses = getAllAnalyses();
      
      if (analyses.isEmpty) {
        return {
          'totalAnalyses': 0,
          'averageConfidence': 0.0,
          'cryTypeDistribution': <String, int>{},
          'mostCommonCryType': null,
          'averageDuration': Duration.zero,
        };
      }
      
      // Toplam analiz sayısı
      final totalAnalyses = analyses.length;
      
      // Ortalama güven skoru
      final averageConfidence = analyses
          .map((a) => a.confidence)
          .reduce((a, b) => a + b) / totalAnalyses;
      
      // Ağlama türü dağılımı
      final cryTypeDistribution = <String, int>{};
      for (final analysis in analyses) {
        final typeName = analysis.cryType.displayName;
        cryTypeDistribution[typeName] = (cryTypeDistribution[typeName] ?? 0) + 1;
      }
      
      // En yaygın ağlama türü
      String? mostCommonCryType;
      int maxCount = 0;
      cryTypeDistribution.forEach((type, count) {
        if (count > maxCount) {
          maxCount = count;
          mostCommonCryType = type;
        }
      });
      
      // Ortalama süre
      final totalDuration = analyses
          .map((a) => a.duration.inMilliseconds)
          .reduce((a, b) => a + b);
      final averageDuration = Duration(
        milliseconds: totalDuration ~/ totalAnalyses
      );
      
      return {
        'totalAnalyses': totalAnalyses,
        'averageConfidence': averageConfidence,
        'cryTypeDistribution': cryTypeDistribution,
        'mostCommonCryType': mostCommonCryType,
        'averageDuration': averageDuration,
      };
    } catch (e) {
      print('İstatistik hesaplama hatası: $e');
      return {
        'totalAnalyses': 0,
        'averageConfidence': 0.0,
        'cryTypeDistribution': <String, int>{},
        'mostCommonCryType': null,
        'averageDuration': Duration.zero,
      };
    }
  }
  
  // Veri temizleme
  static Future<void> clearOldData({int daysToKeep = 30}) async {
    try {
      final cutoffDate = DateTime.now().subtract(Duration(days: daysToKeep));
      
      // Eski analizleri sil
      final oldAnalysisKeys = _analysisBox.keys
          .where((key) {
            final analysis = _analysisBox.get(key);
            return analysis?.timestamp.isBefore(cutoffDate) ?? false;
          })
          .toList();
      
      for (final key in oldAnalysisKeys) {
        await _analysisBox.delete(key);
      }
      
      // Eski geri bildirimleri sil
      final oldFeedbackKeys = _feedbackBox.keys
          .where((key) {
            final feedback = _feedbackBox.get(key);
            return feedback?.createdAt.isBefore(cutoffDate) ?? false;
          })
          .toList();
      
      for (final key in oldFeedbackKeys) {
        await _feedbackBox.delete(key);
      }
      
      print('${oldAnalysisKeys.length} analiz ve ${oldFeedbackKeys.length} geri bildirim temizlendi');
    } catch (e) {
      print('Veri temizleme hatası: $e');
    }
  }
  
  // Tüm verileri dışa aktarma (GDPR uyumluluğu için)
  static Map<String, dynamic> exportAllData() {
    try {
      return {
        'analyses': _analysisBox.values.map((a) => {
          'id': a.id,
          'timestamp': a.timestamp.toIso8601String(),
          'cryType': a.cryType.name,
          'confidence': a.confidence,
          'duration': a.duration.inMilliseconds,
          'features': a.features,
          'isVerified': a.isVerified,
        }).toList(),
        'feedback': _feedbackBox.values.map((f) => f.toJson()).toList(),
        'settings': Map<String, dynamic>.from(_settingsBox.toMap()),
        'exportedAt': DateTime.now().toIso8601String(),
      };
    } catch (e) {
      print('Veri dışa aktarma hatası: $e');
      return {};
    }
  }
  
  // Tüm verileri silme (GDPR uyumluluğu için)
  static Future<void> deleteAllData() async {
    try {
      await _analysisBox.clear();
      await _feedbackBox.clear();
      await _settingsBox.clear();
      print('Tüm veriler silindi');
    } catch (e) {
      print('Veri silme hatası: $e');
      rethrow;
    }
  }
  
  static void dispose() {
    _analysisBox.close();
    _feedbackBox.close();
    _settingsBox.close();
    _isInitialized = false;
  }
}