# AI Modelleri

Bu klasörde uygulamanın kullandığı yapay zeka modelleri bulunur.

## Baby Sound Classifier
- **Dosya**: `baby_sound_model.tflite`
- **Format**: TensorFlow Lite
- **Versiyon**: 1.0.0
- **Boyut**: ~5MB
- **Giriş**: 44100 örnek/saniye, mono ses
- **Çıkış**: 5 sınıf (ağlama, gaz, açlık, uyku, normal)

## Model Eğitimi
Model aşağıdaki verilerle eğitilmiştir:
- Bebek ağlama sesleri
- Gaz çıkarma sesleri
- Açlık belirtileri
- Uyku sesleri
- Normal bebek aktiviteleri

## Çevrimdışı Kullanım
- Model tamamen cihazda çalışır
- İnternet bağlantısı gerektirmez
- Güvenli ve gizli analiz

## Model Güncelleme
Model federated learning ile geliştirilir:
- Kullanıcı geri bildirimleri anonim olarak işlenir
- Sadece model parametreleri paylaşılır
- Kişisel veriler asla transfer edilmez

## Kurulum
Model dosyası uygulamanın ilk çalıştırılmasında otomatik olarak indirilir:
```bash
# Model indirme (gerçek uygulamada)
curl -o baby_sound_model.tflite "https://models.edeninni.com/v1/baby_sound_model.tflite"
```