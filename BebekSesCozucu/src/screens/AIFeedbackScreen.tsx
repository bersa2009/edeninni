import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AIFeedbackScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Geri Bildirim</Text>
          <Text style={styles.subtitle}>Sistemimizin doğruluğunu artırın</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.infoText}>
            Son analiz sonucunuzun doğruluğunu değerlendirerek
            yapay zekâ modelimizi geliştirmemize yardımcı olun.
          </Text>

          <TouchableOpacity style={styles.feedbackCard}>
            <Text style={styles.feedbackQuestion}>
              Son ağlama analizi sonucunuz doğru muydu?
            </Text>
            <View style={styles.feedbackButtons}>
              <TouchableOpacity style={styles.positiveButton}>
                <Text style={styles.positiveButtonText}>✅ Doğru</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.negativeButton}>
                <Text style={styles.negativeButtonText}>❌ Yanlış</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>📊 Model Performansı</Text>
            <Text style={styles.statsText}>Doğruluk Oranı: %85</Text>
            <Text style={styles.statsText}>Toplam Geri Bildirim: 1,247</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  feedbackCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  feedbackQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  positiveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  positiveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  negativeButton: {
    backgroundColor: '#FF4444',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  negativeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default AIFeedbackScreen;