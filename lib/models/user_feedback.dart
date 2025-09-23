import 'package:hive/hive.dart';
import 'cry_analysis.dart';

part 'user_feedback.g.dart';

@HiveType(typeId: 3)
class FeedbackData extends HiveObject {
  @HiveField(0)
  final String id;
  
  @HiveField(1)
  final String analysisId;
  
  @HiveField(2)
  final bool wasAccurate;
  
  @HiveField(3)
  final CryType? correctedType;
  
  @HiveField(4)
  final int satisfactionRating; // 1-5 scale
  
  @HiveField(5)
  final bool suggestionWasHelpful;
  
  @HiveField(6)
  final String? additionalComments;
  
  @HiveField(7)
  final DateTime createdAt;
  
  @HiveField(8)
  final bool isUsedForTraining;

  FeedbackData({
    required this.id,
    required this.analysisId,
    required this.wasAccurate,
    this.correctedType,
    required this.satisfactionRating,
    required this.suggestionWasHelpful,
    this.additionalComments,
    required this.createdAt,
    this.isUsedForTraining = false,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'analysisId': analysisId,
      'wasAccurate': wasAccurate,
      'correctedType': correctedType?.index,
      'satisfactionRating': satisfactionRating,
      'suggestionWasHelpful': suggestionWasHelpful,
      'additionalComments': additionalComments,
      'createdAt': createdAt.toIso8601String(),
      'isUsedForTraining': isUsedForTraining,
    };
  }

  factory FeedbackData.fromJson(Map<String, dynamic> json) {
    return FeedbackData(
      id: json['id'],
      analysisId: json['analysisId'],
      wasAccurate: json['wasAccurate'],
      correctedType: json['correctedType'] != null 
          ? CryType.values[json['correctedType']] 
          : null,
      satisfactionRating: json['satisfactionRating'],
      suggestionWasHelpful: json['suggestionWasHelpful'],
      additionalComments: json['additionalComments'],
      createdAt: DateTime.parse(json['createdAt']),
      isUsedForTraining: json['isUsedForTraining'] ?? false,
    );
  }
}