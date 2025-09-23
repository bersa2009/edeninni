import 'package:hive/hive.dart';

part 'cry_analysis.g.dart';

@HiveType(typeId: 0)
class CryAnalysis extends HiveObject {
  @HiveField(0)
  final String id;
  
  @HiveField(1)
  final DateTime timestamp;
  
  @HiveField(2)
  final CryType cryType;
  
  @HiveField(3)
  final double confidence;
  
  @HiveField(4)
  final Duration duration;
  
  @HiveField(5)
  final Map<String, double> features;
  
  @HiveField(6)
  final String? audioPath;
  
  @HiveField(7)
  final bool isVerified;
  
  @HiveField(8)
  final UserFeedback? feedback;

  CryAnalysis({
    required this.id,
    required this.timestamp,
    required this.cryType,
    required this.confidence,
    required this.duration,
    required this.features,
    this.audioPath,
    this.isVerified = false,
    this.feedback,
  });

  CryAnalysis copyWith({
    String? id,
    DateTime? timestamp,
    CryType? cryType,
    double? confidence,
    Duration? duration,
    Map<String, double>? features,
    String? audioPath,
    bool? isVerified,
    UserFeedback? feedback,
  }) {
    return CryAnalysis(
      id: id ?? this.id,
      timestamp: timestamp ?? this.timestamp,
      cryType: cryType ?? this.cryType,
      confidence: confidence ?? this.confidence,
      duration: duration ?? this.duration,
      features: features ?? this.features,
      audioPath: audioPath ?? this.audioPath,
      isVerified: isVerified ?? this.isVerified,
      feedback: feedback ?? this.feedback,
    );
  }
}

@HiveType(typeId: 1)
enum CryType {
  @HiveField(0)
  hungry,
  
  @HiveField(1)
  sleepy,
  
  @HiveField(2)
  uncomfortable,
  
  @HiveField(3)
  pain,
  
  @HiveField(4)
  attention,
  
  @HiveField(5)
  unknown;

  String get displayName {
    switch (this) {
      case CryType.hungry:
        return 'Açlık';
      case CryType.sleepy:
        return 'Uyku';
      case CryType.uncomfortable:
        return 'Rahatsızlık';
      case CryType.pain:
        return 'Ağrı';
      case CryType.attention:
        return 'Dikkat';
      case CryType.unknown:
        return 'Belirsiz';
    }
  }

  String get description {
    switch (this) {
      case CryType.hungry:
        return 'Bebeğiniz aç olabilir. Beslenme zamanı gelmiş olabilir.';
      case CryType.sleepy:
        return 'Bebeğiniz yorgun ve uyumak istiyor olabilir.';
      case CryType.uncomfortable:
        return 'Bebeğiniz rahatsız olabilir. Bez kontrolü yapın.';
      case CryType.pain:
        return 'Bebeğiniz ağrı hissediyor olabilir. Kontrol edin.';
      case CryType.attention:
        return 'Bebeğiniz ilgi ve sevgi arıyor olabilir.';
      case CryType.unknown:
        return 'Ağlama nedeni belirlenemedi.';
    }
  }

  String get suggestion {
    switch (this) {
      case CryType.hungry:
        return 'Emzirin veya mama verin';
      case CryType.sleepy:
        return 'Sakin bir ortamda uyutmaya çalışın';
      case CryType.uncomfortable:
        return 'Bezini kontrol edin, kıyafetlerini düzenleyin';
      case CryType.pain:
        return 'Sıcaklık ölçün, gerekirse doktora başvurun';
      case CryType.attention:
        return 'Bebeğinizle konuşun, sarılın';
      case CryType.unknown:
        return 'Genel kontroller yapın';
    }
  }
}

@HiveType(typeId: 2)
class UserFeedback extends HiveObject {
  @HiveField(0)
  final String analysisId;
  
  @HiveField(1)
  final bool wasCorrect;
  
  @HiveField(2)
  final CryType? actualCryType;
  
  @HiveField(3)
  final String? comment;
  
  @HiveField(4)
  final DateTime timestamp;
  
  @HiveField(5)
  final bool suggestionHelped;

  UserFeedback({
    required this.analysisId,
    required this.wasCorrect,
    this.actualCryType,
    this.comment,
    required this.timestamp,
    required this.suggestionHelped,
  });
}