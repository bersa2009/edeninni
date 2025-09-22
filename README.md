# Edeninni - Akıllı Bebek Bakım Uygulaması

## Proje Amacı
Edeninni, yapay zeka destekli bir bebek bakım uygulamasıdır. Bebeklerin seslerini analiz ederek ebeveynlere gaz, ağlama, uyku gibi ihtiyaçlar konusunda akıllı öneriler sunar.

## Ana Özellikler

### 🤖 Yapay Zeka ve Bağımsız Çalışma
- **Çevrimdışı AI Modeli**: Tüm analizler cihazda gerçekleşir, internet bağlantısı gerektirmez
- **Yerel İşlemler**: Bebek sesleri hiçbir zaman sunucuya gönderilmez
- **Akıllı Öneriler**: Gaz, açlık, uyku gibi durumları otomatik olarak tespit eder

### 🔒 Güvenlik ve Gizlilik
- **KVKK/GDPR Uyumlu**: Tüm kişisel veriler cihazda kalır
- **Şifreli Depolama**: Hassas veriler şifrelenerek saklanır
- **Anonim Analytics**: Sadece kullanım istatistikleri anonim olarak paylaşılır

### 🧠 Federated Learning
- **Yerel Öğrenme**: Model kullanıcının geri bildirimleriyle kendini geliştirir
- **Gizli Güncellemeler**: Sadece anonimleşmiş model güncellemeleri paylaşılır
- **Kişisel Veri Yok**: Hiçbir bebek sesi veya kişisel bilgi transfer edilmez

## Kurulum
```bash
# Proje bağımlılıkları yüklenecek
npm install

# Geliştirme modunda çalıştırma
npm run dev
```

## Kullanım
1. Uygulamayı açın
2. Bebeğinizin sesini kaydedin
3. AI analizi otomatik olarak başlar
4. Akıllı öneriler anında görüntülenir

## Teknoloji Stack'i
- React Native / Flutter (mobil)
- TensorFlow Lite (çevrimdışı AI)
- SQLite (yerel veritabanı)
- AES-256 (şifreleme)

## Lisans
Bu proje açık kaynak kodludur ve MIT lisansı altında dağıtılmaktadır.
