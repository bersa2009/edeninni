# Bebek Ses Çözücü 👶🎙️

[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg)](https://reactnative.dev/)
[![Expo SDK](https://img.shields.io/badge/Expo%20SDK-51.0-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Yapay zeka destekli bebek ağlama analizi uygulaması. Bu React Native (Expo) uygulaması, bebeğinizin ağlama seslerini analiz ederek ihtiyaçlarını belirlemenize yardımcı olur.

## 📱 Demo

<p align="center">
  <img src="docs/screenshots/home.png" width="200" alt="Ana Menü" />
  <img src="docs/screenshots/recording.png" width="200" alt="Kayıt Ekranı" />
  <img src="docs/screenshots/analysis.png" width="200" alt="Analiz Ekranı" />
  <img src="docs/screenshots/results.png" width="200" alt="Sonuçlar" />
</p>

## 🚀 Özellikler

- **3 Adımlı Analiz Süreci**: Kayıt → Analiz → Sonuç
- **Türkçe Arayüz**: Tamamen Türkçe yerelleştirme
- **Pastel Tasarım**: Erişilebilir ve modern kullanıcı arayüzü
- **On-Device İşleme**: Gelecekte yerel AI modeli entegrasyonu için hazır
- **TypeScript**: Tip güvenli kod geliştirme

## 📱 Ekran Akışı

### 1. Ana Menü (`app/index.tsx`)
- Uygulamaya giriş noktası
- "Analize Başla" butonu ile analiz ekranına yönlendirme

### 2. Kayıt Ekranı (`app/analyze/index.tsx`)
- Büyük mikrofon butonu
- Kayıt başlat/durdur işlevselliği
- Kullanıcı bilgilendirme banner'ı

### 3. Analiz Ekranı (`app/analyze/analyzing.tsx`)
- Progress ring animasyonu
- Otomatik AI analizi
- Sonuç ekranına otomatik geçiş

### 4. Sonuç Ekranı (`app/analyze/result.tsx`)
- Yüzdelik analiz sonuçları
- En olası sebep vurgusu
- "Önerileri Gör" ve "Tekrar Analiz Et" butonları

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS Simulator veya Android Emulator (geliştirme için)

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Uygulamayı başlatın:**
```bash
npm start
```

3. **Platform seçin:**
- iOS için: `i` tuşuna basın
- Android için: `a` tuşuna basın
- Web için: `w` tuşuna basın

## 🔄 Uygulama Akışı

Detaylı akış diyagramları için: [docs/FLOW_DIAGRAM.md](docs/FLOW_DIAGRAM.md)

```
Ana Menü → Kayıt Ekranı → Analiz Ekranı → Sonuç Ekranı → Öneriler Ekranı
    ↑                                           ↓
    ←←←←←←←←← Tekrar Analiz Et ←←←←←←←←←←←←←←←←←←←
```

## 📁 Proje Yapısı

```
app/
  _layout.tsx              # Expo Router layout
  index.tsx                # Ana menü
  analyze/
    index.tsx              # Kayıt ekranı
    analyzing.tsx          # Analiz ekranı
    result.tsx             # Sonuç ekranı

components/
  index.ts                 # Ana export dosyası
  buttons/
    Button.tsx             # Genel buton bileşeni
    MicButton.tsx          # Mikrofon butonu
  layout/
    BannerInfo.tsx         # Bilgi banner'ı
    ErrorBoundary.tsx      # Hata yakalama bileşeni
  cards/
    ResultRow.tsx          # Sonuç satırı bileşeni
  ui/
    ProgressRing.tsx       # Analiz progress göstergesi

ai/
  AiService.ts             # AI analiz servisi (stub)
  audio.ts                 # Ses kayıt işlevleri

types/
  index.ts                 # TypeScript tip tanımları

lib/
  theme.ts                 # Tema konfigürasyonu
  nav.ts                   # Navigasyon yardımcıları
  i18n.ts                  # Yerelleştirme
  api.ts                   # Backend API servisi
  storage.ts               # Local storage yönetimi

i18n/
  tr.json                  # Türkçe çeviriler
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: `#7E57C2` (Mor)
- **Açlık**: `#E6F5ED` (Açık yeşil)
- **Gaz**: `#FCE8D9` (Açık turuncu)
- **Yorgunluk**: `#E7F0FF` (Açık mavi)
- **Background**: `#F5F3FF` (Çok açık mor)

### Tipografi
- **Başlık**: 26px, kalın
- **Alt başlık**: 22px, yarı kalın
- **Gövde**: 16px, normal
- **Açıklama**: 14px, normal

## 🤖 AI Entegrasyonu

Şu anda `ai/AiService.ts` dosyasında mock veriler kullanılmaktadır. Gerçek AI modeli entegrasyonu için:

### TensorFlow Lite Entegrasyonu
```typescript
// Gelecek implementasyon
import * as tf from '@tensorflow/tfjs-react-native';

export async function analyze(filePath: string): Promise<AnalysisResult> {
  // 1. Audio preprocessing (MFCC, spectrogram)
  // 2. Model loading
  // 3. Inference
  // 4. Post-processing
}
```

### Model Gereksinimleri
- **Sample Rate**: 16kHz
- **Window Size**: 1024
- **Hop Length**: 512
- **MFCC Features**: 13
- **Classes**: ['hunger', 'gas', 'fatigue']

## 📱 Platform Desteği

- ✅ iOS
- ✅ Android
- ✅ Web (sınırlı)

## 🔒 İzinler

### iOS
- `NSMicrophoneUsageDescription`: Mikrofon erişimi

### Android
- `android.permission.RECORD_AUDIO`: Ses kayıt izni

## 🧪 Test Etme

Mock analiz sonuçları:
- Açlık: %70 (±20 rastgele)
- Gaz: %20 (±20 rastgele)
- Yorgunluk: %10 (±20 rastgele)

## 🔮 Gelecek Özellikler

- [ ] Gerçek AI modeli entegrasyonu
- [ ] Öneriler ekranı
- [ ] Geçmiş analiz kayıtları
- [ ] Kullanıcı profili ve ayarları
- [ ] Çoklu dil desteği
- [ ] Offline çalışma modu

## 🐛 Bilinen Sorunlar

- Web platformunda mikrofon erişimi sınırlı
- Mock veriler gerçek analiz yapmaz
- Öneriler ekranı henüz implementasyonda değil

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen katkıda bulunmadan önce [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını okuyun.

### Geliştirme Süreci

1. **Fork yapın**: Bu repository'yi fork edin
2. **Branch oluşturun**: `git checkout -b feature/amazing-feature`
3. **Değişiklikleri yapın**: Kodunuzu yazın ve test edin
4. **Commit edin**: `git commit -m 'feat: Add amazing feature'`
5. **Push edin**: `git push origin feature/amazing-feature`
6. **Pull Request oluşturun**: GitHub'da PR açın

### Commit Mesaj Formatı

Bu proje [Conventional Commits](https://www.conventionalcommits.org/) standardını kullanır:

- `feat:` Yeni özellik
- `fix:` Bug düzeltme
- `docs:` Dokümantasyon değişikliği
- `style:` Kod formatı (işlevselliği etkilemeyen)
- `refactor:` Kod refactoring
- `test:` Test ekleme/düzeltme
- `chore:` Build süreci veya yardımcı araç değişiklikleri

## 🐛 Bug Raporları

Bug bulduğunuzda lütfen [GitHub Issues](https://github.com/username/bebek-ses-cozucu/issues) kullanarak rapor edin:

1. Bug'ın detaylı açıklaması
2. Tekrar etme adımları
3. Beklenen davranış vs gerçek davranış
4. Screenshots (varsa)
5. Cihaz bilgileri (iOS/Android version, device model)

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Detaylar için LICENSE dosyasına bakın.

## 👥 Katkıda Bulunanlar

- [@username](https://github.com/username) - Proje sahibi ve ana geliştirici

## 📞 İletişim

- **GitHub Issues**: [Issues sayfası](https://github.com/username/bebek-ses-cozucu/issues)
- **Email**: your.email@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)

## 🙏 Teşekkürler

- [Expo Team](https://expo.dev/) - Harika geliştirme platformu için
- [React Native Community](https://reactnative.dev/) - Güçlü framework için
- Tüm beta testerlar ve katkıda bulunanlara

---

## ⚠️ Önemli Not

**Bu uygulama eğitim ve araştırma amaçlıdır. Gerçek tıbbi tavsiye sağlamaz. Bebeğinizin sağlığı ve ihtiyaçları konusunda her zaman qualified bir sağlık uzmanına danışın.**

## 🏷️ Versiyonlar

- **v1.0.0** - İlk stabil sürüm
  - 3 ekranlı analiz akışı
  - Türkçe yerelleştirme
  - Mock AI analiz sistemi
  - Error handling ve logging
  - Performance optimizasyonları