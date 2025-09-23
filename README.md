# Bebek Ağlama Analizi - Offline AI Uygulaması

## Proje Özeti
Bu uygulama, yapay zeka kullanarak bebek ağlama seslerini analiz eden, tamamen çevrimdışı çalışabilen ve gizlilik odaklı bir mobil uygulamadır.

## Ana Özellikler

### 🤖 Yapay Zeka ve Bağımsız Çalışma
- **Çevrimdışı Çalışma**: AI modeli doğrudan uygulama içinde yer alır, internet bağlantısı gerektirmez
- **Güvenlik**: Hiçbir bebek sesi sunucuya gönderilmez, tüm analizler cihazda gerçekleşir
- **Federated Learning**: Model kullanıcı geri bildirimleriyle yerel olarak öğrenir ve kendini iyileştirir

### 🔒 Gizlilik ve Güvenlik
- KVKV/GDPR uyumlu veri işleme
- Kişisel veriler cihazdan çıkmaz
- Anonimleşmiş model güncellemeleri
- End-to-end şifreleme

### 📱 Kullanıcı Deneyimi
- Gerçek zamanlı ses analizi
- Sezgirel kullanıcı arayüzü
- Çoklu dil desteği (Türkçe, İngilizce)
- Offline çalışma garantisi

## Teknoloji Yığını
- **Mobil Framework**: Flutter
- **AI/ML**: TensorFlow Lite
- **Ses İşleme**: Flutter Audio
- **Veri Saklama**: Hive (Local Database)
- **State Management**: Riverpod

## Proje Yapısı
```
baby_cry_analyzer/
├── lib/
│   ├── core/           # Temel yapılar ve yardımcılar
│   ├── models/         # AI modelleri ve veri modelleri
│   ├── services/       # Ses işleme, AI servisleri
│   ├── ui/             # Kullanıcı arayüzü
│   ├── utils/          # Yardımcı fonksiyonlar
│   └── main.dart       # Ana uygulama
├── assets/
│   ├── models/         # TensorFlow Lite modelleri
│   └── sounds/         # Test ses dosyaları
├── android/
├── ios/
└── pubspec.yaml
```

## Kurulum ve Çalıştırma
```bash
# Bağımlılıkları yükle
flutter pub get

# Uygulamayı çalıştır
flutter run
```

## Lisans
MIT License