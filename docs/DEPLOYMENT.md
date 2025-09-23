# Deployment Rehberi

Bu dokümantasyon, Bebek Ses Çözücü uygulamasının farklı platformlarda nasıl deploy edileceğini açıklar.

## 📋 Ön Gereksinimler

### Genel Gereksinimler
- Node.js (v18 veya üzeri)
- Expo CLI (`npm install -g @expo/cli`)
- EAS CLI (`npm install -g eas-cli`)
- Git

### Platform Spesifik Gereksinimler

#### iOS
- macOS (Xcode için)
- Apple Developer Account ($99/yıl)
- Xcode (App Store'a yükleme için)

#### Android
- Android Studio (opsiyonel)
- Google Play Console Account ($25 bir kerelik)
- Java keystore dosyası

## 🚀 Expo Application Services (EAS) ile Deployment

### 1. EAS Kurulumu

```bash
# EAS CLI'ı yükleyin
npm install -g eas-cli

# EAS'a login olun
eas login

# Projeyi initialize edin
eas build:configure
```

### 2. EAS Build Configuration

`eas.json` dosyası otomatik oluşturulacak:

```json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Build İşlemi

#### Development Build
```bash
# iOS development build
eas build --platform ios --profile development

# Android development build
eas build --platform android --profile development
```

#### Production Build
```bash
# iOS production build
eas build --platform ios --profile production

# Android production build  
eas build --platform android --profile production

# Her iki platform
eas build --platform all --profile production
```

## 📱 App Store (iOS) Deployment

### 1. Apple Developer Account Kurulumu

1. [Apple Developer](https://developer.apple.com) hesabı oluşturun
2. App ID oluşturun
3. Provisioning Profile'ları ayarlayın

### 2. App Store Connect Kurulumu

1. [App Store Connect](https://appstoreconnect.apple.com)'e gidin
2. Yeni uygulama oluşturun
3. App bilgilerini doldurun:
   - **App Name**: Bebek Ses Çözücü
   - **Bundle ID**: com.yourcompany.bebeksescozucu
   - **Category**: Medical veya Lifestyle

### 3. Metadata Hazırlama

#### App Store Screenshots
- iPhone 6.7" (1290x2796) - 3 adet
- iPhone 6.5" (1242x2688) - 3 adet  
- iPhone 5.5" (1242x2208) - 3 adet
- iPad Pro (2732x2048) - 3 adet

#### App Store Açıklaması
```
Bebeğinizin ağlama seslerini analiz ederek ihtiyaçlarını anlayın.

✨ ÖZELLİKLER:
• Yapay zeka destekli ses analizi
• 3 temel ihtiyaç kategorisi (açlık, gaz, yorgunluk)
• Türkçe arayüz
• Kolay kullanım
• Gizlilik odaklı (veriler cihazda kalır)

🔒 GİZLİLİK:
Tüm analiz işlemleri cihazınızda gerçekleşir. Ses kayıtları internet üzerinden gönderilmez.

⚠️ UYARI:
Bu uygulama eğitim amaçlıdır. Tıbbi tavsiye sağlamaz. Bebeğinizin sağlığı için doktorunuza danışın.
```

### 4. Build ve Submit

```bash
# iOS build ve otomatik submit
eas build --platform ios --profile production --auto-submit

# Manuel submit
eas submit --platform ios
```

## 🤖 Google Play Store (Android) Deployment

### 1. Google Play Console Kurulumu

1. [Google Play Console](https://play.google.com/console) hesabı oluşturun ($25)
2. Yeni uygulama oluşturun
3. App bilgilerini doldurun

### 2. Keystore Oluşturma

```bash
# EAS otomatik keystore oluşturur
eas credentials
```

### 3. Play Store Metadata

#### Store Listing
- **App Name**: Bebek Ses Çözücü
- **Short Description**: Yapay zeka ile bebek ağlama analizi
- **Full Description**: (App Store ile aynı)
- **Category**: Parenting
- **Content Rating**: Everyone

#### Screenshots
- Phone: 1080x1920 - 8 adet
- 7-inch Tablet: 1024x600 - 1 adet  
- 10-inch Tablet: 1280x800 - 1 adet

### 4. Build ve Submit

```bash
# Android build ve submit
eas build --platform android --profile production
eas submit --platform android
```

## 🌐 Web Deployment

### 1. Expo Web Build

```bash
# Web build
npx expo export:web

# Build dosyaları dist/ klasöründe oluşur
```

### 2. Netlify Deployment

```bash
# Netlify CLI yükleyin
npm install -g netlify-cli

# Deploy edin
netlify deploy --prod --dir dist
```

### 3. Vercel Deployment

```bash
# Vercel CLI yükleyin
npm install -g vercel

# Deploy edin
vercel --prod
```

### 4. GitHub Pages Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build for web
      run: npx expo export:web
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: |
        npx tsc --noEmit
        npx expo-doctor
    
    - name: Setup EAS
      uses: expo/expo-github-action@v8
      with:
        eas-version: latest
        token: ${{ secrets.EXPO_TOKEN }}
    
    - name: Build iOS
      if: startsWith(github.ref, 'refs/tags/')
      run: eas build --platform ios --profile production --non-interactive
    
    - name: Build Android
      if: startsWith(github.ref, 'refs/tags/')
      run: eas build --platform android --profile production --non-interactive
```

## 📊 Release Management

### Versioning

Semantic Versioning kullanın:
- `1.0.0` - Major release
- `1.1.0` - Minor release (new features)
- `1.0.1` - Patch release (bug fixes)

### Release Process

1. **Version Bump**
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   npm version minor  # 1.0.0 -> 1.1.0
   npm version major  # 1.0.0 -> 2.0.0
   ```

2. **Tag ve Push**
   ```bash
   git push origin main --tags
   ```

3. **GitHub Release**
   - GitHub'da release oluşturun
   - Changelog ekleyin
   - Binary dosyaları attach edin

## 🔒 Environment Variables

### Production Secrets

```bash
# EAS secrets
eas secret:create --scope project --name API_URL --value "https://api.example.com"
eas secret:create --scope project --name SENTRY_DSN --value "your-sentry-dsn"

# Local secrets (.env - Git'e eklemeyin)
API_URL=http://localhost:3000
DEBUG=true
```

### app.config.js

```javascript
export default {
  expo: {
    name: process.env.APP_NAME || "Bebek Ses Çözücü",
    slug: "bebek-ses-cozucu",
    version: process.env.APP_VERSION || "1.0.0",
    extra: {
      apiUrl: process.env.API_URL,
      sentryDsn: process.env.SENTRY_DSN,
    },
  },
};
```

## 📈 Monitoring ve Analytics

### Sentry Error Tracking

```bash
npm install @sentry/react-native

# Sentry CLI
npm install -g @sentry/cli
```

### Expo Analytics

```javascript
// app/_layout.tsx
import { Analytics } from 'expo-analytics';

const analytics = new Analytics('YOUR_TRACKING_ID');

export default function RootLayout() {
  useEffect(() => {
    analytics.hit('App Started');
  }, []);
  
  return (
    // Your app
  );
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache
   expo r -c
   eas build:cancel
   ```

2. **Certificate Issues**
   ```bash
   # Reset credentials
   eas credentials
   ```

3. **Submission Fails**
   ```bash
   # Check logs
   eas submit --platform ios --verbose
   ```

### Support Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://play.google.com/about/developer-content-policy/)

## ✅ Deployment Checklist

### Pre-Deploy
- [ ] Tüm testler geçiyor
- [ ] TypeScript hataları yok
- [ ] Expo doctor kontrolleri tamam
- [ ] Version numarası güncellendi
- [ ] Changelog hazırlandı

### iOS App Store
- [ ] Apple Developer hesabı aktif
- [ ] App Store Connect'te uygulama oluşturuldu
- [ ] Screenshots hazırlandı
- [ ] App Store açıklaması yazıldı
- [ ] Privacy policy eklendi
- [ ] App Review Guidelines kontrol edildi

### Android Play Store
- [ ] Google Play Console hesabı aktif
- [ ] Keystore oluşturuldu
- [ ] Screenshots hazırlandı
- [ ] Store listing tamamlandı
- [ ] Content rating alındı
- [ ] Play Store policies kontrol edildi

### Post-Deploy
- [ ] App store'larda yayınlandı
- [ ] Analytics kuruldu
- [ ] Error tracking aktif
- [ ] Release notes paylaşıldı
- [ ] User feedback izleniyor