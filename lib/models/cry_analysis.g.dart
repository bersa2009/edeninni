// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'cry_analysis.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class CryAnalysisAdapter extends TypeAdapter<CryAnalysis> {
  @override
  final int typeId = 0;

  @override
  CryAnalysis read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return CryAnalysis(
      id: fields[0] as String,
      timestamp: fields[1] as DateTime,
      cryType: fields[2] as CryType,
      confidence: fields[3] as double,
      duration: fields[4] as Duration,
      features: Map.castFrom<dynamic, dynamic, String, double>(fields[5]),
      audioPath: fields[6] as String?,
      isVerified: fields[7] as bool,
      feedback: fields[8] as UserFeedback?,
    );
  }

  @override
  void write(BinaryWriter writer, CryAnalysis obj) {
    writer
      ..writeByte(9)
      ..writeByte(0)
      ..write(obj.id)
      ..writeByte(1)
      ..write(obj.timestamp)
      ..writeByte(2)
      ..write(obj.cryType)
      ..writeByte(3)
      ..write(obj.confidence)
      ..writeByte(4)
      ..write(obj.duration)
      ..writeByte(5)
      ..write(obj.features)
      ..writeByte(6)
      ..write(obj.audioPath)
      ..writeByte(7)
      ..write(obj.isVerified)
      ..writeByte(8)
      ..write(obj.feedback);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CryAnalysisAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

class CryTypeAdapter extends TypeAdapter<CryType> {
  @override
  final int typeId = 1;

  @override
  CryType read(BinaryReader reader) {
    switch (reader.readByte()) {
      case 0:
        return CryType.hungry;
      case 1:
        return CryType.sleepy;
      case 2:
        return CryType.uncomfortable;
      case 3:
        return CryType.pain;
      case 4:
        return CryType.attention;
      case 5:
        return CryType.unknown;
      default:
        return CryType.unknown;
    }
  }

  @override
  void write(BinaryWriter writer, CryType obj) {
    switch (obj) {
      case CryType.hungry:
        writer.writeByte(0);
        break;
      case CryType.sleepy:
        writer.writeByte(1);
        break;
      case CryType.uncomfortable:
        writer.writeByte(2);
        break;
      case CryType.pain:
        writer.writeByte(3);
        break;
      case CryType.attention:
        writer.writeByte(4);
        break;
      case CryType.unknown:
        writer.writeByte(5);
        break;
    }
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is CryTypeAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

class UserFeedbackAdapter extends TypeAdapter<UserFeedback> {
  @override
  final int typeId = 2;

  @override
  UserFeedback read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return UserFeedback(
      analysisId: fields[0] as String,
      wasCorrect: fields[1] as bool,
      actualCryType: fields[2] as CryType?,
      comment: fields[3] as String?,
      timestamp: fields[4] as DateTime,
      suggestionHelped: fields[5] as bool,
    );
  }

  @override
  void write(BinaryWriter writer, UserFeedback obj) {
    writer
      ..writeByte(6)
      ..writeByte(0)
      ..write(obj.analysisId)
      ..writeByte(1)
      ..write(obj.wasCorrect)
      ..writeByte(2)
      ..write(obj.actualCryType)
      ..writeByte(3)
      ..write(obj.comment)
      ..writeByte(4)
      ..write(obj.timestamp)
      ..writeByte(5)
      ..write(obj.suggestionHelped);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is UserFeedbackAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}