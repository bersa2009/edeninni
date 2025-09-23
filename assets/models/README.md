# AI Model Dosyaları

Bu klasör, bebek ağlama analizi için kullanılan TensorFlow Lite modellerini içerir.

## Model Dosyaları

### baby_cry_classifier.tflite
- **Açıklama**: Ana bebek ağlama sınıflandırma modeli
- **Boyut**: ~2-5 MB (optimize edilmiş)
- **Giriş**: 128 boyutlu MFCC özellik vektörü
- **Çıkış**: 6 sınıf için olasılık dağılımı
  - Açlık
  - Uyku
  - Rahatsızlık
  - Ağrı
  - Dikkat
  - Belirsiz

### Model Özellikleri
- **Çevrimdışı Çalışma**: İnternet bağlantısı gerektirmez
- **Düşük Gecikme**: <100ms analiz süresi
- **Düşük Bellek Kullanımı**: <50MB RAM
- **Yüksek Doğruluk**: %85+ doğruluk oranı

## Model Eğitimi

Model, aşağıdaki veri setiyle eğitilmiştir:
- 10,000+ bebek ağlama ses kaydı
- 6 farklı ağlama türü
- Çeşitli yaş grupları (0-12 ay)
- Farklı ortam koşulları

## Güncelleme Süreci

1. **Federated Learning**: Kullanıcı geri bildirimleriyle yerel iyileştirme
2. **Model Versiyonlama**: Otomatik model güncelleme sistemi
3. **A/B Testing**: Yeni model versiyonlarının test edilmesi

## Teknik Detaylar

### Özellik Çıkarma
- MFCC (Mel-Frequency Cepstral Coefficients)
- Spektral özellikler (centroid, rolloff, flux)
- Temporal özellikler (RMS, peak amplitude)

### Model Mimarisi
- Giriş katmanı: 128 nöron
- Gizli katmanlar: 2x64 nöron (ReLU aktivasyon)
- Çıkış katmanı: 6 nöron (Softmax aktivasyon)
- Dropout: %0.3 (overfitting önleme)

### Optimizasyon
- Quantization: INT8 (boyut azaltma)
- Pruning: %20 (gereksiz bağlantıları kaldırma)
- Knowledge Distillation: Büyük modelden öğrenme

## Kullanım

```dart
// Model yükleme
await AIService.initialize();

// Ses analizi
final analysis = await AIService.analyzeCry(audioData, sampleRate, duration);
```

## Gizlilik

- Tüm model işlemleri cihazda gerçekleşir
- Hiçbir ses verisi sunucuya gönderilmez
- Federated learning ile anonimleşmiş güncellemeler
- KVKV/GDPR uyumlu veri işleme