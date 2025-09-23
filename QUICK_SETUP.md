# 🚀 Hızlı GitHub Kurulum

## 1️⃣ GitHub Repository Oluşturun

1. **[GitHub'a gidin](https://github.com/new)**
2. **Repository bilgileri**:
   ```
   Repository name: bebek-ses-cozucu
   Description: 🍼 Yapay zeka destekli bebek ağlama analizi - React Native (Expo) uygulaması
   ✅ Public
   ❌ Add a README file
   ❌ Add .gitignore
   ❌ Choose a license
   ```
3. **"Create repository" tıklayın**

## 2️⃣ Otomatik Yükleme

Terminal'de bu komutu çalıştırın:

```bash
./upload-to-github.sh
```

## 3️⃣ Manuel Yükleme (Alternatif)

GitHub repository oluşturduktan sonra:

```bash
# Remote ekle (YOURUSERNAME yerine GitHub kullanıcı adınızı yazın)
git remote add origin https://github.com/YOURUSERNAME/bebek-ses-cozucu.git

# Push et
git branch -M main
git push -u origin main
```

## 4️⃣ Repository Ayarları

GitHub'da repository'nizi açın ve:

### About Section
- **Description**: 🍼 Yapay zeka destekli bebek ağlama analizi - React Native (Expo) uygulaması
- **Topics**: `react-native`, `expo`, `typescript`, `baby`, `ai`, `audio-analysis`, `mobile-app`, `parenting`, `turkish`, `accessibility`

### Settings
- ✅ Issues aktif
- ✅ Discussions aktif
- ✅ Wiki aktif

## 5️⃣ İlk Release

```bash
# Version tag oluştur
git tag -a v1.0.0 -m "🎉 Initial release - Complete baby cry analyzer app"

# Tag'i push et
git push origin v1.0.0
```

GitHub'da **Releases** → **Create a new release** → **v1.0.0** seçin.

## ✅ Tamamlandı!

Projeniz artık GitHub'da! 🎉

**Repository URL**: `https://github.com/YOURUSERNAME/bebek-ses-cozucu`

### 📱 Sonraki Adımlar:
1. **Expo Integration**: `expo login` → `eas build:configure`
2. **CI/CD**: GitHub Actions otomatik çalışacak
3. **Deployment**: `docs/DEPLOYMENT.md` rehberini takip edin
4. **Community**: Issues ve Discussions'ı aktif kullanın

🚀 **Happy Coding!**