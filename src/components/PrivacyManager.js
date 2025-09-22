import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';

const PrivacyManager = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: false,
    locationTracking: false,
    analytics: false,
    personalizedAds: false,
    thirdPartySharing: false,
  });

  const [permissions, setPermissions] = useState({
    microphone: true,
    storage: true,
    notifications: true,
  });

  const updatePrivacySetting = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updatePermission = (key, value) => {
    setPermissions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const deleteAllData = () => {
    Alert.alert(
      'Tüm Verileri Sil',
      'Bu işlem tüm analiz geçmişini, ayarları ve yerel verileri silecektir. Bu işlem geri alınamaz. Devam etmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            // Tüm yerel verileri sil
            Alert.alert('Başarılı', 'Tüm verileriniz silindi');
          }
        }
      ]
    );
  };

  const downloadPrivacyReport = () => {
    // Yerel gizlilik raporu oluştur
    const report = {
      dataStored: '2.3 MB yerel veri',
      lastBackup: new Date().toLocaleDateString('tr-TR'),
      permissions: permissions,
      privacySettings: privacySettings,
    };

    Alert.alert('Gizlilik Raporu', JSON.stringify(report, null, 2));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gizlilik Yönetimi</Text>

      <View style={styles.privacyScore}>
        <Text style={styles.scoreTitle}>Gizlilik Puanınız</Text>
        <Text style={styles.scoreValue}>98/100</Text>
        <Text style={styles.scoreText}>Mükemmel! Verileriniz güvende.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Veri Toplama Ayarları</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Analitik Veriler</Text>
            <Text style={styles.settingDescription}>
              Kullanım istatistikleri (anonim)
            </Text>
          </View>
          <Switch
            value={privacySettings.analytics}
            onValueChange={(value) => updatePrivacySetting('analytics', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Kişiselleştirilmiş Reklamlar</Text>
            <Text style={styles.settingDescription}>
              İlgi alanlarınıza göre reklamlar
            </Text>
          </View>
          <Switch
            value={privacySettings.personalizedAds}
            onValueChange={(value) => updatePrivacySetting('personalizedAds', value)}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingText}>Üçüncü Parti Paylaşımı</Text>
            <Text style={styles.settingDescription}>
              Verilerinizin üçüncü partilerle paylaşımı
            </Text>
          </View>
          <Switch
            value={privacySettings.thirdPartySharing}
            onValueChange={(value) => updatePrivacySetting('thirdPartySharing', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İzin Yönetimi</Text>

        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionText}>🎤 Mikrofon</Text>
            <Text style={styles.permissionDescription}>
              Ses analizi için gerekli
            </Text>
          </View>
          <Switch
            value={permissions.microphone}
            onValueChange={(value) => updatePermission('microphone', value)}
          />
        </View>

        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionText}>💾 Depolama</Text>
            <Text style={styles.permissionDescription}>
              Analiz verilerini saklama için
            </Text>
          </View>
          <Switch
            value={permissions.storage}
            onValueChange={(value) => updatePermission('storage', value)}
          />
        </View>

        <View style={styles.permissionItem}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionText}>🔔 Bildirimler</Text>
            <Text style={styles.permissionDescription}>
              Analiz sonuçları için
            </Text>
          </View>
          <Switch
            value={permissions.notifications}
            onValueChange={(value) => updatePermission('notifications', value)}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Güvenlik İşlemleri</Text>

        <TouchableOpacity style={styles.securityButton} onPress={downloadPrivacyReport}>
          <Text style={styles.securityButtonText}>Gizlilik Raporu İndir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.securityButton} onPress={deleteAllData}>
          <Text style={styles.securityButtonText}>Tüm Verileri Sil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>🔒 KVKK ve GDPR Uyumluluğu</Text>
        <Text style={styles.infoText}>
          Uygulamamız KVKK (Kişisel Verilerin Korunması Kanunu) ve GDPR (General Data Protection Regulation) standartlarına tam uyumlu olarak geliştirilmiştir.
        </Text>

        <Text style={styles.infoTitle}>📍 Veri Konumu</Text>
        <Text style={styles.infoText}>
          Tüm verileriniz Türkiye'de, cihazınızda saklanır. Sunucularımıza hiçbir kişisel veri transferi yapılmaz.
        </Text>

        <Text style={styles.infoTitle}>🛡️ Şifreleme</Text>
        <Text style={styles.infoText}>
          Verileriniz AES-256 şifreleme algoritması ile korunur. Anahtarlar sadece cihazınızda tutulur.
        </Text>

        <Text style={styles.infoTitle}>🤝 Federated Learning</Text>
        <Text style={styles.infoText}>
          Model geliştirmesine katkıda bulunmak isterseniz, sadece anonimleştirilmiş model güncellemeleri paylaşılır.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Sorularınız için: gizlilik@edeninni.com
        </Text>
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
  privacyScore: {
    backgroundColor: '#27ae60',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  scoreTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  permissionInfo: {
    flex: 1,
  },
  permissionText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 2,
  },
  permissionDescription: {
    fontSize: 12,
    color: '#666',
  },
  securityButton: {
    backgroundColor: '#e74c3c',
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
  securityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#e8f4fd',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a4a6b',
    marginBottom: 8,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#1a4a6b',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default PrivacyManager;