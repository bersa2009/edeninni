import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as FileSystem from 'expo-file-system';

const SoundAnalyzer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const startRecording = async () => {
    try {
      // Ses kaydı izinleri kontrol edilecek
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Ses kaydı için mikrofona erişim izni verin.');
        return;
      }

      setIsRecording(true);

      // Yerel AI modelini kullanarak ses analizi
      // Bu kısımda TensorFlow Lite modeli kullanılacak

      setTimeout(() => {
        const mockResult = {
          id: Date.now(),
          timestamp: new Date().toLocaleString('tr-TR'),
          type: 'ağlama',
          confidence: 0.78,
          suggestion: 'Bebeğinizi sakinleştirmek için ninni çalın',
          duration: '2.3 saniye'
        };

        setAnalysisHistory(prev => [mockResult, ...prev]);
        setIsRecording(false);

        Alert.alert('Analiz Tamamlandı', mockResult.suggestion);
      }, 5000);

    } catch (error) {
      Alert.alert('Hata', 'Ses kaydı başlatılamadı');
      setIsRecording(false);
    }
  };

  const clearHistory = () => {
    Alert.alert(
      'Geçmişi Temizle',
      'Tüm analiz geçmişini silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => setAnalysisHistory([])
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ses Analizi</Text>

      <View style={styles.recordingContainer}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingButton]}
          onPress={startRecording}
          disabled={isRecording}
        >
          <Text style={styles.recordButtonText}>
            {isRecording ? '🔴 Kayıt Yapılıyor...' : '🎤 Kaydı Başlat'}
          </Text>
        </TouchableOpacity>

        {isRecording && (
          <Text style={styles.recordingText}>
            Bebeğinizin doğal seslerini kaydedin. Analiz {Math.floor(Math.random() * 10) + 5} saniye sürecek.
          </Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>💡 İpuçları:</Text>
        <Text style={styles.infoText}>
          • Bebeğinizin 1-2 metre yakınında durun{'\n'}
          • Sessiz bir ortam tercih edin{'\n'}
          • Normal ağlama/sesleri kaydedin{'\n'}
          • Hiçbir ses verisi cihazınızdan çıkmaz
        </Text>
      </View>

      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Analiz Geçmişi</Text>
          {analysisHistory.length > 0 && (
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearButton}>Temizle</Text>
            </TouchableOpacity>
          )}
        </View>

        {analysisHistory.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyItemHeader}>
              <Text style={styles.historyTime}>{item.timestamp}</Text>
              <Text style={styles.historyDuration}>{item.duration}</Text>
            </View>
            <Text style={styles.historyType}>
              Tespit: {item.type.toUpperCase()}
            </Text>
            <Text style={styles.historySuggestion}>{item.suggestion}</Text>
            <Text style={styles.historyConfidence}>
              Güven: {Math.round(item.confidence * 100)}%
            </Text>
          </View>
        ))}

        {analysisHistory.length === 0 && (
          <Text style={styles.emptyHistory}>
            Henüz analiz yapılmamış. İlk kaydınızı yapın!
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 30,
  },
  recordingContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordButton: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  recordingButton: {
    backgroundColor: '#e74c3c',
  },
  recordButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recordingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#fff3cd',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  historyContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  clearButton: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
  historyItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  historyItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyTime: {
    fontSize: 12,
    color: '#666',
  },
  historyDuration: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  historyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  historySuggestion: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 5,
  },
  historyConfidence: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '500',
  },
  emptyHistory: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 30,
  },
});

export default SoundAnalyzer;