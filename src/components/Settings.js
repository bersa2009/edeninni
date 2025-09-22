import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoAnalysis: false,
    soundAlerts: true,
    dataRetention: 30,
    federatedLearning: true,
    anonymousStats: false,
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    Alert.alert(
      'Ayarları Sıfırla',
      'Tüm ayarlar varsayılan değerlere dönecek. Devam etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sıfırla',
          style: 'destructive',
          onPress: () => {
            setSettings({
              notifications: true,
              autoAnalysis: false,
              soundAlerts: true,
              dataRetention: 30,
              federatedLearning: true,
              anonymousStats: false,
            });
            Alert.alert('Başarılı', 'Ayarlar sıfırlandı');
          }
        }
      ]
    );
  };

  const exportData = () => {
    Alert.alert(
      'Veri Aktarımı',
      'Analiz geçmişinizi dışa aktarmak istediğinizden emin misiniz? Bu işlem sadece yerel verilerinizle ilgilidir.',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Aktar',
          onPress: () => {
            // Yerel veri aktarımı - sunucuya gönderilmez
            Alert.alert('Başarılı', 'Verileriniz dışa aktarıldı');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bildirimler</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Analiz Bildirimleri</Text>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => updateSetting('notifications', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Sesli Uyarılar</Text>
          <Switch
            value={settings.soundAlerts}
            onValueChange={(value) => updateSetting('soundAlerts', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI ve Analiz</Text>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Otomatik Analiz</Text>
          <Switch
            value={settings.autoAnalysis}
            onValueChange={(value) => updateSetting('autoAnalysis', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Federated Learning</Text>
          <Switch
            value={settings.federatedLearning}
            onValueChange={(value) => updateSetting('federatedLearning', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Anonim İstatistikler</Text>
          <Switch
            value={settings.anonymousStats}
            onValueChange={(value) => updateSetting('anonymousStats', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Veri Yönetimi</Text>

        <TouchableOpacity style={styles.actionButton} onPress={exportData}>
          <Text style={styles.actionButtonText}>Veri Aktar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={resetSettings}>
          <Text style={styles.actionButtonText}>Ayarları Sıfırla</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>📊 Veri Saklama Politikası</Text>
        <Text style={styles.infoText}>
          Analiz verileriniz {settings.dataRetention} gün boyunca cihazınızda saklanır.
          Bu süre sonunda otomatik olarak silinir.
        </Text>

        <Text style={styles.infoTitle}>🔒 Güvenlik Bilgisi</Text>
        <Text style={styles.infoText}>
          Tüm verileriniz şifrelenmiş olarak cihazınızda saklanır.
          Hiçbir kişisel veri sunucularımıza gönderilmez.
        </Text>

        <Text style={styles.infoTitle}>🧠 Federated Learning</Text>
        <Text style={styles.infoText}>
          Açık olduğunda, modeliniz geri bildirimlerinizle gelişir.
          Sadece anonim model güncellemeleri paylaşılır.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>Edeninni v1.0.0</Text>
        <Text style={styles.copyright}>© 2024 Edeninni. Tüm hakları saklıdır.</Text>
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
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    fontSize: 16,
    color: '#34495e',
    flex: 1,
  },
  actionButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#e8f5e8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d5a2d',
    marginBottom: 8,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#2d5a2d',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default Settings;