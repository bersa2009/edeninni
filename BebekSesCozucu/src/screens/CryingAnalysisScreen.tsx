import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sound from 'react-native-sound';

const { width } = Dimensions.get('window');

interface AnalysisResult {
  hunger: number;
  gas: number;
  tiredness: number;
  discomfort: number;
  reason: string;
  suggestion: string;
}

const CryingAnalysisScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const pulseAnimation = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<number | null>(null);

  // Simulate AI analysis - in real app, this would be connected to ML model
  const performAnalysis = (): AnalysisResult => {
    // Random probabilities that add up to 100%
    const hunger = Math.floor(Math.random() * 60) + 20; // 20-80%
    const gas = Math.floor(Math.random() * 40) + 10; // 10-50%
    const tiredness = Math.floor(Math.random() * 30) + 5; // 5-35%
    const discomfort = 100 - hunger - gas - tiredness;

    const reasons = [
      { reason: 'Açlık', suggestion: 'Emzirme önerilir' },
      { reason: 'Gaz', suggestion: 'Bisiklet hareketi uygulayın' },
      { reason: 'Yorgunluk', suggestion: 'Uyku vakti olabilir' },
      { reason: 'Rahatsızlık', suggestion: 'Bez kontrolü yapın' },
    ];

    const maxProb = Math.max(hunger, gas, tiredness, discomfort);
    let mainReason = reasons[0];

    if (gas === maxProb) mainReason = reasons[1];
    else if (tiredness === maxProb) mainReason = reasons[2];
    else if (discomfort === maxProb) mainReason = reasons[3];

    return {
      hunger,
      gas,
      tiredness,
      discomfort,
      reason: mainReason.reason,
      suggestion: mainReason.suggestion,
    };
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setAnalysisResult(null);

    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 9) { // 10 seconds total
          stopRecording();
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsAnalyzing(true);

    // Stop animation
    pulseAnimation.stopAnimation();
    pulseAnimation.setValue(1);

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Simulate analysis delay
    setTimeout(() => {
      const result = performAnalysis();
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setRecordingTime(0);
  };

  const renderProbabilityBar = (label: string, percentage: number, color: string) => (
    <View key={label} style={styles.probabilityItem}>
      <View style={styles.probabilityHeader}>
        <Text style={styles.probabilityLabel}>{label}</Text>
        <Text style={styles.probabilityValue}>{percentage}%</Text>
      </View>
      <View style={styles.probabilityBar}>
        <View
          style={[
            styles.probabilityFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Recording Section */}
        <View style={styles.recordingSection}>
          <Text style={styles.sectionTitle}>Ağlama Analizi</Text>
          <Text style={styles.instructions}>
            Mikrofon butonuna basarak 5-10 saniye bebek ağlaması kaydedin
          </Text>

          <View style={styles.recordingContainer}>
            <Animated.View
              style={[
                styles.microphoneContainer,
                {
                  transform: [{ scale: pulseAnimation }],
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.microphoneButton,
                  isRecording && styles.recordingButton,
                ]}
                onPress={isRecording ? stopRecording : startRecording}
                disabled={isAnalyzing}>
                <Text style={styles.microphoneIcon}>
                  {isAnalyzing ? '🔄' : isRecording ? '⏹️' : '🎤'}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {isRecording && (
              <Text style={styles.recordingTime}>
                Kayıt: {recordingTime}/10 saniye
              </Text>
            )}

            {isAnalyzing && (
              <Text style={styles.analyzingText}>Analiz ediliyor...</Text>
            )}
          </View>
        </View>

        {/* Analysis Results */}
        {analysisResult && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>Analiz Sonucu</Text>

            <View style={styles.probabilitiesContainer}>
              {renderProbabilityBar('Açlık', analysisResult.hunger, '#FF6B6B')}
              {renderProbabilityBar('Gaz', analysisResult.gas, '#4CAF50')}
              {renderProbabilityBar('Yorgunluk', analysisResult.tiredness, '#2196F3')}
              {renderProbabilityBar('Rahatsızlık', analysisResult.discomfort, '#FF9800')}
            </View>

            <View style={styles.suggestionContainer}>
              <Text style={styles.mainReason}>🎯 {analysisResult.reason}</Text>
              <Text style={styles.suggestion}>{analysisResult.suggestion}</Text>
            </View>

            <TouchableOpacity style={styles.resetButton} onPress={resetAnalysis}>
              <Text style={styles.resetButtonText}>Yeni Analiz</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Instructions when no recording */}
        {!isRecording && !analysisResult && !isAnalyzing && (
          <View style={styles.instructionsSection}>
            <Text style={styles.instructionText}>
              💡 İpucu: En iyi sonuç için bebeğinize 30-50 cm uzaklıktan kayıt yapın
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recordingSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  recordingContainer: {
    alignItems: 'center',
  },
  microphoneContainer: {
    marginBottom: 20,
  },
  microphoneButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#9370DB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  recordingButton: {
    backgroundColor: '#FF4444',
  },
  microphoneIcon: {
    fontSize: 50,
    color: 'white',
  },
  recordingTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF4444',
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9370DB',
  },
  resultsSection: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  probabilitiesContainer: {
    marginBottom: 25,
  },
  probabilityItem: {
    marginBottom: 15,
  },
  probabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  probabilityLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  probabilityValue: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  probabilityBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 4,
  },
  suggestionContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
  },
  mainReason: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9370DB',
    marginBottom: 10,
  },
  suggestion: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsSection: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default CryingAnalysisScreen;