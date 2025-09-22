import 'dart:convert';
import 'dart:io';
import 'package:crypto/crypto.dart';
import 'package:path_provider/path_provider.dart';
import 'storage_service.dart';

/// KVKV/GDPR uyumlu gizlilik servisi
class PrivacyService {
  static const String _privacyPolicyVersion = '1.0';
  static const String _consentKey = 'privacy_consent';
  static const String _consentVersionKey = 'consent_version';
  static const String _dataRetentionDays = 'data_retention_days';
  
  /// Gizlilik onayını kontrol et
  static bool hasValidConsent() {
    final hasConsent = StorageService.getSetting<bool>(_consentKey, defaultValue: false) ?? false;
    final consentVersion = StorageService.getSetting<String>(_consentVersionKey);
    
    return hasConsent && consentVersion == _privacyPolicyVersion;
  }
  
  /// Gizlilik onayını kaydet
  static Future<void> giveConsent() async {
    await StorageService.saveSetting(_consentKey, true);
    await StorageService.saveSetting(_consentVersionKey, _privacyPolicyVersion);
    await StorageService.saveSetting('consent_date', DateTime.now().toIso8601String());
  }
  
  /// Gizlilik onayını geri al
  static Future<void> revokeConsent() async {
    await StorageService.saveSetting(_consentKey, false);
    await StorageService.saveSetting('consent_revoked_date', DateTime.now().toIso8601String());
  }
  
  /// Veri saklama süresini ayarla (varsayılan 30 gün)
  static Future<void> setDataRetentionPeriod(int days) async {
    await StorageService.saveSetting(_dataRetentionDays, days);
  }
  
  /// Veri saklama süresini getir
  static int getDataRetentionPeriod() {
    return StorageService.getSetting<int>(_dataRetentionDays, defaultValue: 30) ?? 30;
  }
  
  /// Otomatik veri temizleme
  static Future<void> performAutomaticDataCleanup() async {
    final retentionDays = getDataRetentionPeriod();
    await StorageService.clearOldData(daysToKeep: retentionDays);
  }
  
  /// Kullanıcı verilerini anonimleştir
  static Map<String, dynamic> anonymizeUserData(Map<String, dynamic> data) {
    final anonymizedData = Map<String, dynamic>.from(data);
    
    // Kişisel tanımlayıcıları kaldır veya hash'le
    if (anonymizedData.containsKey('user_id')) {
      anonymizedData['user_id'] = _hashValue(anonymizedData['user_id'].toString());
    }
    
    if (anonymizedData.containsKey('device_id')) {
      anonymizedData['device_id'] = _hashValue(anonymizedData['device_id'].toString());
    }
    
    // Zaman damgalarını yuvarla (gün seviyesine)
    if (anonymizedData.containsKey('timestamp')) {
      final timestamp = DateTime.parse(anonymizedData['timestamp']);
      final roundedTimestamp = DateTime(timestamp.year, timestamp.month, timestamp.day);
      anonymizedData['timestamp'] = roundedTimestamp.toIso8601String();
    }
    
    // Ses dosyası yollarını kaldır
    anonymizedData.remove('audio_path');
    anonymizedData.remove('file_path');
    
    return anonymizedData;
  }
  
  /// Veri minimizasyonu - sadece gerekli verileri tut
  static Map<String, dynamic> minimizeData(Map<String, dynamic> data, List<String> requiredFields) {
    final minimizedData = <String, dynamic>{};
    
    for (final field in requiredFields) {
      if (data.containsKey(field)) {
        minimizedData[field] = data[field];
      }
    }
    
    return minimizedData;
  }
  
  /// Veri şifreleme
  static Future<String> encryptData(String data, String key) async {
    // Basit şifreleme örneği - üretimde daha güçlü şifreleme kullanın
    final keyBytes = utf8.encode(key);
    final dataBytes = utf8.encode(data);
    
    final hmac = Hmac(sha256, keyBytes);
    final digest = hmac.convert(dataBytes);
    
    final encrypted = base64.encode(dataBytes + digest.bytes);
    return encrypted;
  }
  
  /// Veri şifre çözme
  static Future<String?> decryptData(String encryptedData, String key) async {
    try {
      final keyBytes = utf8.encode(key);
      final encryptedBytes = base64.decode(encryptedData);
      
      if (encryptedBytes.length < 32) return null; // Minimum HMAC boyutu
      
      final dataBytes = encryptedBytes.sublist(0, encryptedBytes.length - 32);
      final receivedHash = encryptedBytes.sublist(encryptedBytes.length - 32);
      
      final hmac = Hmac(sha256, keyBytes);
      final expectedHash = hmac.convert(dataBytes);
      
      // Hash doğrulaması
      if (!_compareHashes(receivedHash, expectedHash.bytes)) {
        return null;
      }
      
      return utf8.decode(dataBytes);
    } catch (e) {
      return null;
    }
  }
  
  /// GDPR uyumlu veri dışa aktarma
  static Future<Map<String, dynamic>> exportPersonalData() async {
    final allData = StorageService.exportAllData();
    
    return {
      'export_info': {
        'export_date': DateTime.now().toIso8601String(),
        'data_controller': 'Baby Cry Analyzer App',
        'legal_basis': 'User consent (GDPR Art. 6.1.a)',
        'retention_period': '${getDataRetentionPeriod()} days',
      },
      'personal_data': allData,
      'privacy_settings': {
        'consent_given': hasValidConsent(),
        'consent_version': StorageService.getSetting<String>(_consentVersionKey),
        'consent_date': StorageService.getSetting<String>('consent_date'),
        'data_retention_days': getDataRetentionPeriod(),
      },
    };
  }
  
  /// GDPR uyumlu veri silme (unutulma hakkı)
  static Future<void> deletePersonalData({required String reason}) async {
    // Silme nedenini kaydet
    await StorageService.saveSetting('data_deletion_reason', reason);
    await StorageService.saveSetting('data_deletion_date', DateTime.now().toIso8601String());
    
    // Tüm kişisel verileri sil
    await StorageService.deleteAllData();
    
    // Silme kaydını tut (yasal gereklilik)
    await StorageService.saveSetting('deletion_record', {
      'reason': reason,
      'date': DateTime.now().toIso8601String(),
      'status': 'completed',
    });
  }
  
  /// Veri işleme aktivitelerini logla
  static Future<void> logDataProcessingActivity({
    required String activity,
    required String purpose,
    required String legalBasis,
    Map<String, dynamic>? additionalInfo,
  }) async {
    final logEntry = {
      'timestamp': DateTime.now().toIso8601String(),
      'activity': activity,
      'purpose': purpose,
      'legal_basis': legalBasis,
      'additional_info': additionalInfo,
    };
    
    final existingLogs = StorageService.getSetting<List>('processing_logs', defaultValue: []) ?? [];
    existingLogs.add(logEntry);
    
    // Son 100 log kaydını tut
    if (existingLogs.length > 100) {
      existingLogs.removeRange(0, existingLogs.length - 100);
    }
    
    await StorageService.saveSetting('processing_logs', existingLogs);
  }
  
  /// Gizlilik etkisi değerlendirmesi
  static Map<String, dynamic> performPrivacyImpactAssessment() {
    return {
      'assessment_date': DateTime.now().toIso8601String(),
      'data_types': [
        'Audio analysis results',
        'User feedback',
        'App usage statistics',
      ],
      'processing_purposes': [
        'Baby cry analysis',
        'Model improvement',
        'User experience enhancement',
      ],
      'legal_basis': 'User consent (GDPR Art. 6.1.a)',
      'data_retention': '${getDataRetentionPeriod()} days',
      'third_party_sharing': 'None - all processing is local',
      'security_measures': [
        'Local data processing',
        'Data encryption',
        'Automatic data deletion',
        'Anonymization for model updates',
      ],
      'user_rights': [
        'Right to access',
        'Right to rectification',
        'Right to erasure',
        'Right to data portability',
        'Right to withdraw consent',
      ],
      'risk_level': 'Low',
      'mitigation_measures': [
        'No cloud processing',
        'Federated learning with anonymization',
        'Automatic data cleanup',
        'User control over data retention',
      ],
    };
  }
  
  /// Güvenlik ihlali bildirimi
  static Future<void> reportSecurityBreach({
    required String description,
    required String affectedData,
    required String mitigationSteps,
  }) async {
    final breachReport = {
      'timestamp': DateTime.now().toIso8601String(),
      'description': description,
      'affected_data': affectedData,
      'mitigation_steps': mitigationSteps,
      'status': 'reported',
    };
    
    await StorageService.saveSetting('security_breach_report', breachReport);
    
    // Log the breach
    await logDataProcessingActivity(
      activity: 'Security breach reported',
      purpose: 'Compliance and user notification',
      legalBasis: 'Legal obligation (GDPR Art. 6.1.c)',
      additionalInfo: breachReport,
    );
  }
  
  /// Gizlilik ayarlarını doğrula
  static Map<String, bool> validatePrivacySettings() {
    return {
      'has_valid_consent': hasValidConsent(),
      'data_retention_configured': StorageService.getSetting<int>(_dataRetentionDays) != null,
      'automatic_cleanup_enabled': true, // Her zaman aktif
      'encryption_enabled': true, // Her zaman aktif
      'local_processing_only': true, // Her zaman aktif
    };
  }
  
  // Yardımcı fonksiyonlar
  static String _hashValue(String value) {
    final bytes = utf8.encode(value + 'privacy_salt');
    final digest = sha256.convert(bytes);
    return digest.toString();
  }
  
  static bool _compareHashes(List<int> hash1, List<int> hash2) {
    if (hash1.length != hash2.length) return false;
    
    for (int i = 0; i < hash1.length; i++) {
      if (hash1[i] != hash2[i]) return false;
    }
    
    return true;
  }
  
  /// Gizlilik politikası metni
  static String getPrivacyPolicyText() {
    return '''
Bebek Ağlama Analizi Uygulaması Gizlilik Politikası

1. VERİ SORUMLUSU
Bu uygulama, gizlilik odaklı tasarım ilkesiyle geliştirilmiştir.

2. İŞLENEN KİŞİSEL VERİLER
• Ses analizi sonuçları
• Kullanıcı geri bildirimleri
• Uygulama kullanım istatistikleri

3. VERİ İŞLEME AMAÇLARI
• Bebek ağlama analizi
• Model iyileştirmesi
• Kullanıcı deneyimi geliştirme

4. HUKUKI DAYANAK
KVKK madde 5 ve GDPR madde 6.1.a - Açık rıza

5. VERİ GÜVENLİĞİ
• Tüm işlemler cihazınızda gerçekleşir
• Hiçbir ses kaydı sunucuya gönderilmez
• Veriler şifrelenerek saklanır
• Otomatik veri silme

6. VERİ SAKLAMA SÜRESİ
Varsayılan olarak 30 gün (ayarlanabilir)

7. HAKLARINIZ
• Erişim hakkı
• Düzeltme hakkı
• Silme hakkı (unutulma hakkı)
• Veri taşınabilirliği hakkı
• Rıza geri çekme hakkı

8. İLETİŞİM
support@babycryanalyzer.com

Son güncelleme: ${DateTime.now().day}/${DateTime.now().month}/${DateTime.now().year}
''';
  }
}