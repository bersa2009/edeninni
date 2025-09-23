# İkon Dosyaları

Bu klasör, uygulama içinde kullanılan özel ikon dosyalarını içerir.

## Gerekli İkon Dosyaları

### app_icon.png
- **Açıklama**: Ana uygulama ikonu
- **Boyutlar**: 1024x1024 (master), çeşitli boyutlar gerekli
- **Format**: PNG (şeffaf arka plan)

### microphone_icon.png
- **Açıklama**: Mikrofon ikonu
- **Boyut**: 128x128
- **Kullanım**: Animasyon yoksa alternatif

### baby_icon.png
- **Açıklama**: Bebek ikonu
- **Boyut**: 128x128
- **Kullanım**: Onboarding ekranlarında

### security_icon.png
- **Açıklama**: Güvenlik ikonu
- **Boyut**: 128x128
- **Kullanım**: Gizlilik ekranlarında

### chart_icon.png
- **Açıklama**: Analiz ikonu
- **Boyut**: 128x128
- **Kullanım**: İstatistik ekranlarında

## Platform Özel İkonlar

### Android
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- Çeşitli boyutlarda (48x48, 72x72, 96x96, 144x144, 192x192)

### iOS
- `ios/Runner/Assets.xcassets/AppIcon.appiconset/`
- iOS gereksinimlerine uygun boyutlarda

## İkon Oluşturma

1. Master ikonunu 1024x1024 boyutunda oluşturun
2. Flutter launcher icons plugin kullanın:
   ```bash
   flutter pub get
   flutter pub run flutter_launcher_icons:main
   ```

## Tasarım Rehberi

- Basit ve anlaşılır tasarım
- Bebek bakımı temasına uygun
- Modern ve dostane görünüm
- Platform tasarım rehberlerine uygun