# Bebek Ses Çözücü 👶🎙️

Yapay zeka destekli bebek ağlama analizi uygulaması. Bu React Native (Expo) uygulaması, bebeğinizin ağlama seslerini analiz ederek ihtiyaçlarını belirlemenize yardımcı olur.

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
  MicButton.tsx            # Mikrofon butonu
  ProgressRing.tsx         # Analiz progress göstergesi
  ResultRow.tsx            # Sonuç satırı bileşeni
  BannerInfo.tsx           # Bilgi banner'ı
  Button.tsx               # Genel buton bileşeni

ai/
  AiService.ts             # AI analiz servisi (stub)
  audio.ts                 # Ses kayıt işlevleri

types/
  index.ts                 # TypeScript tip tanımları

lib/
  theme.ts                 # Tema konfigürasyonu
  nav.ts                   # Navigasyon yardımcıları
  i18n.ts                  # Yerelleştirme

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

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 Destek

Sorularınız için GitHub Issues kullanabilirsiniz.

---

**Not**: Bu uygulama eğitim amaçlıdır ve gerçek tıbbi tavsiye sağlamaz. Bebeğinizin sağlığı konusunda her zaman bir sağlık uzmanına danışın.