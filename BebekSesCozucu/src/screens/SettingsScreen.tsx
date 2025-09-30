import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Ayarlar</Text>
          <Text style={styles.subtitle}>Uygulama tercihlerinizi yönetin</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>🌐 Dil ve Görünüm</Text>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Dil</Text>
              <Text style={styles.settingValue}>Türkçe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Tema</Text>
              <Text style={styles.settingValue}>Açık</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>🔒 Gizlilik</Text>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Veri Saklama</Text>
              <Text style={styles.settingValue}>30 gün</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Otomatik Silme</Text>
              <Text style={styles.settingValue}>Kapalı</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>🔔 Bildirimler</Text>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Günlük İpucu</Text>
              <Text style={styles.settingValue}>Açık</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Text style={styles.settingText}>Hatırlatmalar</Text>
              <Text style={styles.settingValue}>Açık</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.aboutButton}>
            <Text style={styles.aboutButtonText}>ℹ️ Hakkında</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>💬 Destek</Text>
          </TouchableOpacity>
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
  settingsSection: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9370DB',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#9370DB',
    fontWeight: '500',
  },
  aboutButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  aboutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  supportButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SettingsScreen;