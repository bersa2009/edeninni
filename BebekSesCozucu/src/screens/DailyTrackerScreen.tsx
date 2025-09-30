import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DailyTrackerScreen: React.FC = () => {
  const today = new Date();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Günlük Takipçi</Text>
          <Text style={styles.subtitle}>Bebeğinizin günlük aktivitelerini kaydedin</Text>
        </View>

        <View style={styles.trackerContainer}>
          <View style={styles.trackerSection}>
            <Text style={styles.sectionTitle}>🍽️ Beslenme</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Beslenme Kaydı Ekle</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trackerSection}>
            <Text style={styles.sectionTitle}>😴 Uyku</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Uyku Kaydı Ekle</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trackerSection}>
            <Text style={styles.sectionTitle}>🧷 Bez Değişimi</Text>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Bez Değişimi Kaydı Ekle</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.remindersContainer}>
            <Text style={styles.remindersTitle}>⏰ Hatırlatmalar</Text>
            <Text style={styles.reminderText}>
              Son beslenme: 2 saat 15 dakika önce
            </Text>
            <Text style={styles.reminderText}>
              Son bez değişimi: 1 saat 30 dakika önce
            </Text>
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
  trackerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  trackerSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  remindersContainer: {
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
  remindersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reminderText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
});

export default DailyTrackerScreen;