import 'dart:async';
import 'dart:typed_data';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:record/record.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

import '../models/cry_analysis.dart';
import 'ai_service.dart';

class AudioService extends ChangeNotifier {
  final AudioRecorder _recorder = AudioRecorder();
  FlutterSoundPlayer? _player;
  
  bool _isRecording = false;
  bool _isAnalyzing = false;
  bool _isInitialized = false;
  
  StreamSubscription<RecordState>? _recordStateSubscription;
  StreamSubscription<Amplitude>? _amplitudeSubscription;
  
  double _currentAmplitude = 0.0;
  Duration _recordingDuration = Duration.zero;
  Timer? _recordingTimer;
  
  // Getters
  bool get isRecording => _isRecording;
  bool get isAnalyzing => _isAnalyzing;
  bool get isInitialized => _isInitialized;
  double get currentAmplitude => _currentAmplitude;
  Duration get recordingDuration => _recordingDuration;
  
  // Events
  final StreamController<CryAnalysis> _analysisController = StreamController.broadcast();
  Stream<CryAnalysis> get analysisStream => _analysisController.stream;
  
  final StreamController<double> _amplitudeController = StreamController.broadcast();
  Stream<double> get amplitudeStream => _amplitudeController.stream;
  
  Future<void> initialize() async {
    if (_isInitialized) return;
    
    try {
      // Mikrofon izni kontrol et
      final permission = await Permission.microphone.status;
      if (permission != PermissionStatus.granted) {
        final result = await Permission.microphone.request();
        if (result != PermissionStatus.granted) {
          throw Exception('Mikrofon izni gerekli');
        }
      }
      
      // Ses oynatıcıyı başlat
      _player = FlutterSoundPlayer();
      await _player!.openPlayer();
      
      // Kayıt durumu dinleyicisi
      _recordStateSubscription = _recorder.onStateChanged().listen((state) {
        _isRecording = state == RecordState.record;
        notifyListeners();
      });
      
      // Amplitude dinleyicisi
      _amplitudeSubscription = _recorder.onAmplitudeChanged(const Duration(milliseconds: 100))
          .listen((amplitude) {
        _currentAmplitude = amplitude.current;
        _amplitudeController.add(_currentAmplitude);
        notifyListeners();
      });
      
      _isInitialized = true;
      notifyListeners();
    } catch (e) {
      print('AudioService başlatma hatası: $e');
      rethrow;
    }
  }
  
  Future<void> startRecording() async {
    if (!_isInitialized) await initialize();
    if (_isRecording) return;
    
    try {
      // Geçici dosya yolu oluştur
      final tempDir = await getTemporaryDirectory();
      final filePath = '${tempDir.path}/baby_cry_${DateTime.now().millisecondsSinceEpoch}.wav';
      
      // Kayıt ayarları
      const config = RecordConfig(
        encoder: AudioEncoder.wav,
        sampleRate: 44100,
        bitRate: 128000,
        numChannels: 1,
      );
      
      // Kayıt başlat
      await _recorder.start(config, path: filePath);
      
      // Süre sayacını başlat
      _recordingDuration = Duration.zero;
      _recordingTimer = Timer.periodic(const Duration(seconds: 1), (timer) {
        _recordingDuration = Duration(seconds: timer.tick);
        notifyListeners();
      });
      
      _isRecording = true;
      notifyListeners();
    } catch (e) {
      print('Kayıt başlatma hatası: $e');
      rethrow;
    }
  }
  
  Future<CryAnalysis?> stopRecording() async {
    if (!_isRecording) return null;
    
    try {
      // Kayıt durdur
      final filePath = await _recorder.stop();
      
      _recordingTimer?.cancel();
      _isRecording = false;
      notifyListeners();
      
      if (filePath == null) {
        throw Exception('Kayıt dosyası oluşturulamadı');
      }
      
      // Ses dosyasını analiz et
      return await analyzeAudioFile(filePath);
    } catch (e) {
      print('Kayıt durdurma hatası: $e');
      _isRecording = false;
      notifyListeners();
      rethrow;
    }
  }
  
  Future<CryAnalysis> analyzeAudioFile(String filePath) async {
    _isAnalyzing = true;
    notifyListeners();
    
    try {
      // Ses dosyasını oku
      final audioData = await _loadAudioFile(filePath);
      
      // AI ile analiz et
      final analysis = await AIService.analyzeCry(
        audioData.audioSamples,
        audioData.sampleRate,
        _recordingDuration,
      );
      
      // Sonucu yayınla
      _analysisController.add(analysis);
      
      return analysis;
    } catch (e) {
      print('Ses analizi hatası: $e');
      rethrow;
    } finally {
      _isAnalyzing = false;
      notifyListeners();
    }
  }
  
  Future<AudioData> _loadAudioFile(String filePath) async {
    try {
      final file = File(filePath);
      final bytes = await file.readAsBytes();
      
      // WAV dosyasını parse et (basitleştirilmiş)
      final audioSamples = _parseWavFile(bytes);
      
      return AudioData(
        audioSamples: audioSamples,
        sampleRate: 44100.0, // Kayıt sırasında kullanılan sample rate
        duration: _recordingDuration,
      );
    } catch (e) {
      print('Ses dosyası yükleme hatası: $e');
      rethrow;
    }
  }
  
  Float32List _parseWavFile(Uint8List bytes) {
    // Basitleştirilmiş WAV parser
    // Gerçek uygulamada daha kapsamlı bir parser kullanılmalı
    
    if (bytes.length < 44) {
      throw Exception('Geçersiz WAV dosyası');
    }
    
    // WAV header'ı atla (44 byte)
    final audioBytes = bytes.sublist(44);
    
    // 16-bit PCM'yi Float32'ye çevir
    final samples = <double>[];
    for (int i = 0; i < audioBytes.length - 1; i += 2) {
      final sample = (audioBytes[i] | (audioBytes[i + 1] << 8));
      final normalizedSample = sample > 32767 
          ? (sample - 65536) / 32768.0 
          : sample / 32767.0;
      samples.add(normalizedSample);
    }
    
    return Float32List.fromList(samples);
  }
  
  Future<void> playAudio(String filePath) async {
    if (_player == null) return;
    
    try {
      await _player!.startPlayer(
        fromURI: filePath,
        codec: Codec.pcm16WAV,
      );
    } catch (e) {
      print('Ses oynatma hatası: $e');
    }
  }
  
  Future<void> stopPlaying() async {
    if (_player == null) return;
    
    try {
      await _player!.stopPlayer();
    } catch (e) {
      print('Ses durdurma hatası: $e');
    }
  }
  
  // Gerçek zamanlı analiz için
  Future<void> startRealtimeAnalysis() async {
    if (!_isInitialized) await initialize();
    
    // Sürekli kayıt ve analiz döngüsü
    Timer.periodic(const Duration(seconds: 3), (timer) async {
      if (!_isRecording) return;
      
      try {
        // Kısa kayıt al
        await startRecording();
        await Future.delayed(const Duration(seconds: 2));
        final analysis = await stopRecording();
        
        if (analysis != null) {
          _analysisController.add(analysis);
        }
      } catch (e) {
        print('Gerçek zamanlı analiz hatası: $e');
      }
    });
  }
  
  // Ses seviyesi kalibrasyonu
  Future<double> calibrateNoiseLevel() async {
    if (!_isInitialized) await initialize();
    
    final amplitudes = <double>[];
    
    // 5 saniye boyunca ortam sesini ölç
    await startRecording();
    
    final calibrationTimer = Timer.periodic(
      const Duration(milliseconds: 100), 
      (timer) {
        amplitudes.add(_currentAmplitude);
        if (timer.tick >= 50) { // 5 saniye
          timer.cancel();
        }
      }
    );
    
    await Future.delayed(const Duration(seconds: 5));
    await stopRecording();
    
    // Ortalama gürültü seviyesi
    final averageNoise = amplitudes.reduce((a, b) => a + b) / amplitudes.length;
    return averageNoise;
  }
  
  @override
  void dispose() {
    _recordingTimer?.cancel();
    _recordStateSubscription?.cancel();
    _amplitudeSubscription?.cancel();
    _analysisController.close();
    _amplitudeController.close();
    _recorder.dispose();
    _player?.closePlayer();
    super.dispose();
  }
}

class AudioData {
  final Float32List audioSamples;
  final double sampleRate;
  final Duration duration;
  
  AudioData({
    required this.audioSamples,
    required this.sampleRate,
    required this.duration,
  });
}