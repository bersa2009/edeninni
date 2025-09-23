// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_feedback.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class FeedbackDataAdapter extends TypeAdapter<FeedbackData> {
  @override
  final int typeId = 3;

  @override
  FeedbackData read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return FeedbackData(
      id: fields[0] as String,
      analysisId: fields[1] as String,
      wasAccurate: fields[2] as bool,
      correctedType: fields[3] as CryType?,
      satisfactionRating: fields[4] as int,
      suggestionWasHelpful: fields[5] as bool,
      additionalComments: fields[6] as String?,
      createdAt: fields[7] as DateTime,
      isUsedForTraining: fields[8] as bool,
    );
  }

  @override
  void write(BinaryWriter writer, FeedbackData obj) {
    writer
      ..writeByte(9)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.analysisId)
      ..writeByte(2)
      ..write(obj.wasAccurate)
      ..writeByte(3)
      ..write(obj.correctedType)
      ..writeByte(4)
      ..write(obj.satisfactionRating)
      ..writeByte(5)
      ..write(obj.suggestionWasHelpful)
      ..writeByte(6)
      ..write(obj.additionalComments)
      ..writeByte(7)
      ..write(obj.createdAt)
      ..writeByte(8)
      ..write(obj.isUsedForTraining);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is FeedbackDataAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}