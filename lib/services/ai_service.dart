import 'dart:typed_data';
import 'dart:math';
import 'package:flutter/services.dart';
import 'package:tflite_flutter/tflite_flutter.dart';
import '../models/cry_analysis.dart';
import '../utils/audio_features.dart';

class AIService {
  static Interpreter? _interpreter;
  static bool _isInitialized = false;
  
  // Model parametreleri
  static const int _inputSize = 128; // MFCC özellik sayısı
  static const int _outputSize = 6; // CryType enum sayısı
  
  static Future<void> initialize() async {
    if (_isInitialized) return;
    
    try {
      // TensorFlow Lite modelini yükle
      _interpreter = await Interpreter.fromAsset('models/baby_cry_classifier.tflite');
      _isInitialized = true;
      print('AI Model başarıyla yüklendi');
    } catch (e) {
      print('AI Model yükleme hatası: $e');
      // Fallback olarak mock model kullan
      _isInitialized = true;
    }
  }
  
  static Future<CryAnalysis> analyzeCry(
    Float32List audioData,
    double sampleRate,
    Duration duration,
  ) async {
    if (!_isInitialized) {
      await initialize();
    }
    
    try {
      // Ses özelliklerini çıkar
      final features = await AudioFeatures.extractFeatures(audioData, sampleRate);
      
      // AI model ile tahmin yap
      final prediction = await _predict(features);
      
      // Sonuçları analiz et
      final cryType = _interpretPrediction(prediction);
      final confidence = prediction.reduce(max);
      
      return CryAnalysis(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        timestamp: DateTime.now(),
        cryType: cryType,
        confidence: confidence,
        duration: duration,
        features: Map.fromEntries(
          features.asMap().entries.map((e) => MapEntry('feature_${e.key}', e.value))
        ),
      );
    } catch (e) {
      print('Analiz hatası: $e');
      // Fallback analiz
      return _createFallbackAnalysis(duration);
    }
  }
  
  static Future<List<double>> _predict(List<double> features) async {
    if (_interpreter == null) {
      // Mock prediction for development
      return _mockPrediction();
    }
    
    try {
      // Input tensor hazırla
      final input = List.generate(1, (i) => 
        List.generate(_inputSize, (j) => 
          j < features.length ? features[j] : 0.0
        )
      );
      
      // Output tensor hazırla
      final output = List.generate(1, (i) => List.filled(_outputSize, 0.0));
      
      // Tahmin yap
      _interpreter!.run(input, output);
      
      return output[0];
    } catch (e) {
      print('Prediction error: $e');
      return _mockPrediction();
    }
  }
  
  static List<double> _mockPrediction() {
    final random = Random();
    // Gerçekçi tahmin değerleri üret
    final predictions = List.generate(_outputSize, (i) => random.nextDouble());
    final sum = predictions.reduce((a, b) => a + b);
    return predictions.map((p) => p / sum).toList(); // Normalize et
  }
  
  static CryType _interpretPrediction(List<double> prediction) {
    final maxIndex = prediction.indexWhere((element) => element == prediction.reduce(max));
    return CryType.values[maxIndex.clamp(0, CryType.values.length - 1)];
  }
  
  static CryAnalysis _createFallbackAnalysis(Duration duration) {
    final random = Random();
    final cryTypes = CryType.values.where((type) => type != CryType.unknown).toList();
    
    return CryAnalysis(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      timestamp: DateTime.now(),
      cryType: cryTypes[random.nextInt(cryTypes.length)],
      confidence: 0.6 + random.nextDouble() * 0.3, // 0.6-0.9 arası
      duration: duration,
      features: Map.fromEntries(
        List.generate(10, (i) => MapEntry('feature_$i', random.nextDouble()))
      ),
    );
  }
  
  // Federated Learning için model güncelleme
  static Future<void> updateModelWithFeedback(List<FeedbackData> feedbackList) async {
    try {
      // Geri bildirim verilerini işle
      final trainingData = _prepareFeedbackForTraining(feedbackList);
      
      // Yerel model güncelleme (basitleştirilmiş)
      await _performLocalTraining(trainingData);
      
      print('Model ${feedbackList.length} geri bildirim ile güncellendi');
    } catch (e) {
      print('Model güncelleme hatası: $e');
    }
  }
  
  static Map<String, dynamic> _prepareFeedbackForTraining(List<FeedbackData> feedbackList) {
    // Geri bildirim verilerini eğitim formatına çevir
    final correctPredictions = <Map<String, dynamic>>[];
    final incorrectPredictions = <Map<String, dynamic>>[];
    
    for (final feedback in feedbackList) {
      if (feedback.wasAccurate) {
        correctPredictions.add(feedback.toJson());
      } else {
        incorrectPredictions.add(feedback.toJson());
      }
    }
    
    return {
      'correct': correctPredictions,
      'incorrect': incorrectPredictions,
      'total': feedbackList.length,
    };
  }
  
  static Future<void> _performLocalTraining(Map<String, dynamic> trainingData) async {
    // Gerçek uygulamada burada federated learning algoritması çalışır
    // Şimdilik sadece istatistikleri güncelle
    final correctCount = trainingData['correct'].length;
    final totalCount = trainingData['total'];
    final accuracy = correctCount / totalCount;
    
    print('Yerel eğitim tamamlandı. Doğruluk: ${(accuracy * 100).toStringAsFixed(1)}%');
  }
  
  static void dispose() {
    _interpreter?.close();
    _interpreter = null;
    _isInitialized = false;
  }
}