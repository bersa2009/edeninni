import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../services/audio_service.dart';

final audioProvider = ChangeNotifierProvider<AudioService>((ref) {
  final audioService = AudioService();
  audioService.initialize();
  return audioService;
});

final amplitudeStreamProvider = StreamProvider<double>((ref) {
  final audioService = ref.watch(audioProvider);
  return audioService.amplitudeStream;
});

final analysisStreamProvider = StreamProvider((ref) {
  final audioService = ref.watch(audioProvider);
  return audioService.analysisStream;
});