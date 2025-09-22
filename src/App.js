import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import SoundAnalyzer from './components/SoundAnalyzer';
import Settings from './components/Settings';
import PrivacyManager from './components/PrivacyManager';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isRecording, setIsRecording] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const startAnalysis = async () => {
    try {
      setIsRecording(true);
      // Yerel AI analizi burada yapılacak
      // Tüm işlemler cihazda kalacak

      setTimeout(() => {
        // Demo sonuç - gerçek AI modeli entegre edilecek
        setAnalysisResult({
          type: 'gaz',
          confidence: 0.85,
          suggestion: 'Bebeğinizi dik tutarak gazını çıkarın'
        });
        setIsRecording(false);
      }, 3000);
    } catch (error) {
      Alert.alert('Hata', 'Ses analizi yapılamadı');
      setIsRecording(false);
    }
  };

  const renderHome = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Edeninni</Text>
      <Text style={styles.subtitle}>Akıllı Bebek Bakım Uygulaması</Text>

      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>🔒 Güvenlik</Text>
        <Text style={styles.featureText}>
          Tüm analizler cihazınızda yapılır. Hiçbir ses verisi sunucuya gönderilmez.
        </Text>
      </View>

      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>🧠 Çevrimdışı AI</Text>
        <Text style={styles.featureText}>
          İnternet bağlantısı olmadan çalışır. Model yerel olarak yüklüdür.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.analyzeButton, isRecording && styles.recordingButton]}
        onPress={startAnalysis}
        disabled={isRecording}
      >
        <Text style={styles.buttonText}>
          {isRecording ? 'Analiz Ediliyor...' : 'Ses Analizi Başlat'}
        </Text>
      </TouchableOpacity>

      {analysisResult && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Analiz Sonucu:</Text>
          <Text style={styles.resultText}>
            Tespit: {analysisResult.type.toUpperCase()}
          </Text>
          <Text style={styles.resultText}>
            Öneri: {analysisResult.suggestion}
          </Text>
          <Text style={styles.resultText}>
            Güven: {Math.round(analysisResult.confidence * 100)}%
          </Text>
        </View>
      )}
    </View>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'analyzer':
        return <SoundAnalyzer />;
      case 'settings':
        return <Settings />;
      case 'privacy':
        return <PrivacyManager />;
      default:
        return renderHome();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.navText}>Ana Sayfa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('analyzer')}
        >
          <Text style={styles.navText}>Analiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('settings')}
        >
          <Text style={styles.navText}>Ayarlar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentScreen('privacy')}
        >
          <Text style={styles.navText}>Gizlilik</Text>
        </TouchableOpacity>
      </View>

      {renderCurrentScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
  },
  featureContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  featureText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  analyzeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  recordingButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#27ae60',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navText: {
    fontSize: 12,
    color: '#2c3e50',
    textAlign: 'center',
  },
});

export default App;