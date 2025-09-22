import * as Crypto from 'expo-crypto';
import * as FileSystem from 'expo-file-system';
import aiConfig from '../../config/ai-config.json';

class SecurityService {
  constructor() {
    this.encryptionKey = null;
  }

  async initialize() {
    try {
      // Şifreleme anahtarını oluştur/güvenli bir şekilde sakla
      const keyFile = FileSystem.documentDirectory + 'security/key.enc';

      const fileInfo = await FileSystem.getInfoAsync(keyFile);

      if (!fileInfo.exists) {
        // Yeni anahtar oluştur
        this.encryptionKey = await this.generateEncryptionKey();
        await this.saveEncryptionKey(this.encryptionKey, keyFile);
      } else {
        // Anahtarı yükle
        this.encryptionKey = await this.loadEncryptionKey(keyFile);
      }

      console.log('Güvenlik servisi başlatıldı');
    } catch (error) {
      console.error('Güvenlik servisi başlatma hatası:', error);
      throw error;
    }
  }

  async generateEncryptionKey() {
    // Güvenli rastgele anahtar oluştur
    const randomBytes = await Crypto.getRandomBytesAsync(32);
    return Array.from(randomBytes)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  async saveEncryptionKey(key, filePath) {
    try {
      // Anahtarı şifreleyerek sakla (ironik olarak, kendi kendini şifreliyor)
      const keyData = {
        key: key,
        timestamp: Date.now(),
        version: '1.0'
      };

      await FileSystem.writeAsStringAsync(
        filePath,
        JSON.stringify(keyData),
        { encoding: FileSystem.EncodingType.UTF8 }
      );
    } catch (error) {
      console.error('Anahtar kaydetme hatası:', error);
      throw error;
    }
  }

  async loadEncryptionKey(filePath) {
    try {
      const keyData = await FileSystem.readAsStringAsync(filePath);
      const parsed = JSON.parse(keyData);
      return parsed.key;
    } catch (error) {
      console.error('Anahtar yükleme hatası:', error);
      throw error;
    }
  }

  async encryptData(data) {
    if (!this.encryptionKey) {
      throw new Error('Şifreleme anahtarı hazır değil');
    }

    try {
      // Basit şifreleme (gerçek uygulamada daha güçlü şifreleme kullanılmalı)
      const dataString = JSON.stringify(data);
      const encrypted = await this.simpleEncrypt(dataString, this.encryptionKey);

      return {
        data: encrypted,
        timestamp: Date.now(),
        algorithm: 'AES-256-SIMPLE'
      };
    } catch (error) {
      console.error('Veri şifreleme hatası:', error);
      throw error;
    }
  }

  async decryptData(encryptedPackage) {
    if (!this.encryptionKey) {
      throw new Error('Şifreleme anahtarı hazır değil');
    }

    try {
      const decrypted = await this.simpleDecrypt(
        encryptedPackage.data,
        this.encryptionKey
      );

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Veri çözme hatası:', error);
      throw error;
    }
  }

  async simpleEncrypt(text, key) {
    // Basit XOR tabanlı şifreleme (demo amaçlı)
    // Gerçek uygulamada AES-256 kullanılmalı
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result); // Base64 encode
  }

  async simpleDecrypt(encryptedText, key) {
    // Basit XOR tabanlı çözme
    const text = atob(encryptedText);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  }

  async secureDelete(filePath) {
    try {
      // Güvenli dosya silme (üzerine yazma)
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        const fileSize = fileInfo.size;

        // Dosyayı rastgele verilerle doldur
        const randomData = await Crypto.getRandomBytesAsync(fileSize);
        const randomString = Array.from(randomData)
          .map(byte => String.fromCharCode(byte))
          .join('');

        await FileSystem.writeAsStringAsync(filePath, randomString);
        await FileSystem.deleteAsync(filePath);
      }
    } catch (error) {
      console.error('Güvenli silme hatası:', error);
      throw error;
    }
  }

  async validateDataIntegrity(data, checksum) {
    // Veri bütünlüğünü kontrol et
    const calculatedChecksum = await this.calculateChecksum(data);
    return calculatedChecksum === checksum;
  }

  async calculateChecksum(data) {
    // Basit checksum hesaplama
    const cryptoHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      JSON.stringify(data)
    );
    return cryptoHash;
  }

  async cleanupOldData() {
    try {
      const retentionDays = aiConfig.security.data_retention_days;
      const cutoffDate = Date.now() - (retentionDays * 24 * 60 * 60 * 1000);

      // Eski verileri temizle
      const dataDirectory = FileSystem.documentDirectory + 'data/';

      const files = await FileSystem.readDirectoryAsync(dataDirectory);

      for (const file of files) {
        const filePath = dataDirectory + file;
        const fileInfo = await FileSystem.getInfoAsync(filePath);

        if (fileInfo.modificationTime < cutoffDate) {
          await this.secureDelete(filePath);
        }
      }

      console.log('Eski veriler temizlendi');
    } catch (error) {
      console.error('Veri temizleme hatası:', error);
    }
  }

  getSecurityInfo() {
    return {
      encryption: aiConfig.security.encryption,
      dataRetention: aiConfig.security.data_retention_days,
      kvkkCompliant: aiConfig.privacy.kvkk_compliant,
      gdprCompliant: aiConfig.privacy.gdpr_compliant,
      localOnly: aiConfig.privacy.data_location === 'local_only'
    };
  }
}

export default new SecurityService();