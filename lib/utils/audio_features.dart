import 'dart:typed_data';
import 'dart:math';
import 'package:fft/fft.dart';

class AudioFeatures {
  static const int _mfccCoefficients = 13;
  static const int _frameSize = 2048;
  static const int _hopSize = 512;
  static const int _melFilters = 26;
  
  /// Ses verisinden özellik çıkarma
  static Future<List<double>> extractFeatures(Float32List audioData, double sampleRate) async {
    try {
      // 1. Ön işleme
      final preprocessed = _preprocess(audioData);
      
      // 2. MFCC özellikleri
      final mfccFeatures = await _extractMFCC(preprocessed, sampleRate);
      
      // 3. Spektral özellikler
      final spectralFeatures = await _extractSpectralFeatures(preprocessed, sampleRate);
      
      // 4. Temporal özellikler
      final temporalFeatures = _extractTemporalFeatures(preprocessed);
      
      // 5. Tüm özellikleri birleştir
      final allFeatures = <double>[]
        ..addAll(mfccFeatures)
        ..addAll(spectralFeatures)
        ..addAll(temporalFeatures);
      
      // 6. Normalizasyon
      return _normalizeFeatures(allFeatures);
    } catch (e) {
      print('Özellik çıkarma hatası: $e');
      return _generateFallbackFeatures();
    }
  }
  
  /// Ses verisini ön işleme
  static Float32List _preprocess(Float32List audioData) {
    // Normalize et (-1 ile 1 arasına)
    final max = audioData.reduce((a, b) => a.abs() > b.abs() ? a : b).abs();
    if (max == 0) return audioData;
    
    return Float32List.fromList(audioData.map((sample) => sample / max).toList());
  }
  
  /// MFCC (Mel-Frequency Cepstral Coefficients) çıkarma
  static Future<List<double>> _extractMFCC(Float32List audioData, double sampleRate) async {
    try {
      // Frame'lere böl
      final frames = _frameSignal(audioData, _frameSize, _hopSize);
      final mfccFrames = <List<double>>[];
      
      for (final frame in frames) {
        // FFT uygula
        final fftResult = FFT().Transform(frame.map((f) => Complex(f, 0)).toList());
        
        // Power spectrum hesapla
        final powerSpectrum = fftResult.map((c) => c.real * c.real + c.imaginary * c.imaginary).toList();
        
        // Mel filter bank uygula
        final melSpectrum = _applyMelFilterBank(powerSpectrum, sampleRate);
        
        // Log uygula
        final logMel = melSpectrum.map((m) => log(m + 1e-10)).toList();
        
        // DCT uygula (MFCC katsayıları)
        final mfcc = _applyDCT(logMel).take(_mfccCoefficients).toList();
        mfccFrames.add(mfcc);
      }
      
      // Frame'ler arası ortalama al
      return _averageFrames(mfccFrames);
    } catch (e) {
      print('MFCC çıkarma hatası: $e');
      return List.filled(_mfccCoefficients, 0.0);
    }
  }
  
  /// Spektral özellikleri çıkarma
  static Future<List<double>> _extractSpectralFeatures(Float32List audioData, double sampleRate) async {
    try {
      final fftResult = FFT().Transform(audioData.map((f) => Complex(f, 0)).toList());
      final powerSpectrum = fftResult.map((c) => c.real * c.real + c.imaginary * c.imaginary).toList();
      
      // Spektral centroid
      final spectralCentroid = _calculateSpectralCentroid(powerSpectrum, sampleRate);
      
      // Spektral rolloff
      final spectralRolloff = _calculateSpectralRolloff(powerSpectrum, sampleRate);
      
      // Spektral flux
      final spectralFlux = _calculateSpectralFlux(powerSpectrum);
      
      // Zero crossing rate
      final zcr = _calculateZeroCrossingRate(audioData);
      
      return [spectralCentroid, spectralRolloff, spectralFlux, zcr];
    } catch (e) {
      print('Spektral özellik hatası: $e');
      return [0.0, 0.0, 0.0, 0.0];
    }
  }
  
  /// Temporal özellikleri çıkarma
  static List<double> _extractTemporalFeatures(Float32List audioData) {
    // RMS energy
    final rmsEnergy = sqrt(audioData.map((s) => s * s).reduce((a, b) => a + b) / audioData.length);
    
    // Peak amplitude
    final peakAmplitude = audioData.reduce((a, b) => a.abs() > b.abs() ? a : b).abs();
    
    // Crest factor
    final crestFactor = peakAmplitude / (rmsEnergy + 1e-10);
    
    return [rmsEnergy, peakAmplitude, crestFactor];
  }
  
  /// Ses sinyalini frame'lere böl
  static List<Float32List> _frameSignal(Float32List signal, int frameSize, int hopSize) {
    final frames = <Float32List>[];
    
    for (int i = 0; i + frameSize <= signal.length; i += hopSize) {
      final frame = Float32List.fromList(signal.sublist(i, i + frameSize));
      // Hamming window uygula
      _applyHammingWindow(frame);
      frames.add(frame);
    }
    
    return frames;
  }
  
  /// Hamming window uygula
  static void _applyHammingWindow(Float32List frame) {
    for (int i = 0; i < frame.length; i++) {
      final window = 0.54 - 0.46 * cos(2 * pi * i / (frame.length - 1));
      frame[i] *= window;
    }
  }
  
  /// Mel filter bank uygula
  static List<double> _applyMelFilterBank(List<double> powerSpectrum, double sampleRate) {
    final melSpectrum = List.filled(_melFilters, 0.0);
    final nyquist = sampleRate / 2;
    
    // Mel scale dönüşümü
    final melMin = _hzToMel(0);
    final melMax = _hzToMel(nyquist);
    final melPoints = List.generate(_melFilters + 2, (i) => 
      melMin + (melMax - melMin) * i / (_melFilters + 1)
    );
    
    final hzPoints = melPoints.map(_melToHz).toList();
    final binPoints = hzPoints.map((hz) => 
      (hz * powerSpectrum.length / sampleRate).floor()
    ).toList();
    
    for (int i = 1; i <= _melFilters; i++) {
      final left = binPoints[i - 1];
      final center = binPoints[i];
      final right = binPoints[i + 1];
      
      for (int j = left; j < center; j++) {
        if (j < powerSpectrum.length) {
          melSpectrum[i - 1] += powerSpectrum[j] * (j - left) / (center - left);
        }
      }
      
      for (int j = center; j < right; j++) {
        if (j < powerSpectrum.length) {
          melSpectrum[i - 1] += powerSpectrum[j] * (right - j) / (right - center);
        }
      }
    }
    
    return melSpectrum;
  }
  
  /// DCT (Discrete Cosine Transform) uygula
  static List<double> _applyDCT(List<double> input) {
    final output = <double>[];
    final N = input.length;
    
    for (int k = 0; k < N; k++) {
      double sum = 0.0;
      for (int n = 0; n < N; n++) {
        sum += input[n] * cos(pi * k * (2 * n + 1) / (2 * N));
      }
      output.add(sum);
    }
    
    return output;
  }
  
  /// Frame'ler arası ortalama hesapla
  static List<double> _averageFrames(List<List<double>> frames) {
    if (frames.isEmpty) return [];
    
    final avgFeatures = List.filled(frames.first.length, 0.0);
    
    for (final frame in frames) {
      for (int i = 0; i < frame.length; i++) {
        avgFeatures[i] += frame[i];
      }
    }
    
    for (int i = 0; i < avgFeatures.length; i++) {
      avgFeatures[i] /= frames.length;
    }
    
    return avgFeatures;
  }
  
  /// Hz'yi Mel'e çevir
  static double _hzToMel(double hz) {
    return 2595 * log10(1 + hz / 700);
  }
  
  /// Mel'i Hz'ye çevir
  static double _melToHz(double mel) {
    return 700 * (pow(10, mel / 2595) - 1);
  }
  
  /// Spektral centroid hesapla
  static double _calculateSpectralCentroid(List<double> powerSpectrum, double sampleRate) {
    double numerator = 0.0;
    double denominator = 0.0;
    
    for (int i = 0; i < powerSpectrum.length; i++) {
      final frequency = i * sampleRate / (2 * powerSpectrum.length);
      numerator += frequency * powerSpectrum[i];
      denominator += powerSpectrum[i];
    }
    
    return denominator > 0 ? numerator / denominator : 0.0;
  }
  
  /// Spektral rolloff hesapla
  static double _calculateSpectralRolloff(List<double> powerSpectrum, double sampleRate) {
    final totalEnergy = powerSpectrum.reduce((a, b) => a + b);
    final threshold = 0.85 * totalEnergy;
    
    double cumulativeEnergy = 0.0;
    for (int i = 0; i < powerSpectrum.length; i++) {
      cumulativeEnergy += powerSpectrum[i];
      if (cumulativeEnergy >= threshold) {
        return i * sampleRate / (2 * powerSpectrum.length);
      }
    }
    
    return sampleRate / 2;
  }
  
  /// Spektral flux hesapla
  static double _calculateSpectralFlux(List<double> powerSpectrum) {
    // Basitleştirilmiş spektral flux
    return powerSpectrum.reduce((a, b) => a + b) / powerSpectrum.length;
  }
  
  /// Zero crossing rate hesapla
  static double _calculateZeroCrossingRate(Float32List audioData) {
    int crossings = 0;
    
    for (int i = 1; i < audioData.length; i++) {
      if ((audioData[i] >= 0) != (audioData[i - 1] >= 0)) {
        crossings++;
      }
    }
    
    return crossings / (audioData.length - 1);
  }
  
  /// Özellikleri normalize et
  static List<double> _normalizeFeatures(List<double> features) {
    final mean = features.reduce((a, b) => a + b) / features.length;
    final variance = features.map((f) => pow(f - mean, 2)).reduce((a, b) => a + b) / features.length;
    final stdDev = sqrt(variance);
    
    if (stdDev == 0) return features;
    
    return features.map((f) => (f - mean) / stdDev).toList();
  }
  
  /// Fallback özellikler üret
  static List<double> _generateFallbackFeatures() {
    final random = Random();
    return List.generate(128, (i) => random.nextDouble() * 2 - 1); // -1 ile 1 arasında
  }
}