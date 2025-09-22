# Edeninni Bebek Programı

Bu uygulama bebek bakımı için sakinleştirme rehberi içerir.

## Sakinleştirme Rehberi

### Özellikler:
- **Açlık**: Bebek aç olduğunda emzirme önerileri (ikon + video)
- **Gaz**: Gaz sorunları için bisiklet hareketi (ikon + video)
- **Uykusuzluk**: Uykusuzluk için kundaklama teknikleri (ikon + video)

### Kullanım:
1. `npm install` ile bağımlılıkları yükleyin
2. `react-native-vector-icons` ve `react-native-video` kütüphanelerini kurun
3. Uygulamayı çalıştırın

### Video Dosyaları:
- `videos/hunger_video.mp4` - Açlık rehberi videosu
- `videos/gas_video.mp4` - Gaz rehberi videosu
- `videos/sleep_video.mp4` - Uyku rehberi videosu

### Bileşen:
`SakinlestirmeRehberi` bileşeni 300x150 piksel kartlar ile üç ana kategoriyi gösterir:
- Mavi başlık
- İkonlar (MaterialIcons)
- Video oynatma butonları
