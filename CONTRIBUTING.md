# Katkıda Bulunma Rehberi

Bebek Ses Çözücü projesine katkıda bulunmak istediğiniz için teşekkür ederiz! Bu rehber, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- Git
- Expo CLI (`npm install -g @expo/cli`)

### Proje Kurulumu

1. **Repository'yi fork edin**
   ```bash
   # GitHub'da fork butonu ile fork edin
   ```

2. **Local'e clone edin**
   ```bash
   git clone https://github.com/YOURUSERNAME/bebek-ses-cozucu.git
   cd bebek-ses-cozucu
   ```

3. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

4. **Development server'ı başlatın**
   ```bash
   npm start
   ```

## 📝 Geliştirme Süreci

### Branch Stratejisi

- `main` - Production-ready kod
- `develop` - Development branch
- `feature/feature-name` - Yeni özellikler
- `fix/bug-name` - Bug düzeltmeleri
- `docs/documentation-update` - Dokümantasyon güncellemeleri

### Yeni Özellik Ekleme

1. **Issue oluşturun** (varsa)
2. **Feature branch oluşturun**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Değişiklikleri yapın**
4. **Test edin**
   ```bash
   npm test
   npx tsc --noEmit  # TypeScript check
   ```

5. **Commit edin**
   ```bash
   git add .
   git commit -m "feat: Add amazing feature"
   ```

6. **Push edin**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Pull Request oluşturun**

## 📋 Kod Standartları

### TypeScript

- Tüm kod TypeScript ile yazılmalı
- Strict mode kullanın
- `any` type kullanımından kaçının
- Interface'leri uygun şekilde tanımlayın

```typescript
// ✅ İyi
interface UserProps {
  name: string;
  age: number;
}

// ❌ Kötü
const user: any = { name: "John", age: 30 };
```

### React/React Native

- Functional component'ler kullanın
- Hooks doğru şekilde kullanın
- Performance için `React.memo()` kullanın
- Props interface'lerini tanımlayın

```typescript
// ✅ İyi
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const Button = memo<ButtonProps>(({ title, onPress, disabled = false }) => {
  // ...
});
```

### Styling

- StyleSheet.create() kullanın
- Theme sistemini kullanın
- Responsive tasarım uygulayın
- Accessibility özellikleri ekleyin

```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
});
```

### Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) standardını kullanın:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Type'lar:**
- `feat` - Yeni özellik
- `fix` - Bug düzeltme
- `docs` - Dokümantasyon
- `style` - Kod formatı
- `refactor` - Code refactoring
- `test` - Test ekleme/düzeltme
- `chore` - Build/tool değişiklikleri

**Örnekler:**
```
feat: Add voice recording functionality
fix: Resolve audio permission issue on Android
docs: Update installation instructions
style: Format code with prettier
refactor: Extract audio service logic
test: Add unit tests for AI service
chore: Update dependencies
```

## 🧪 Test Etme

### Manual Testing

```bash
# TypeScript kontrolü
npx tsc --noEmit

# Expo doctor kontrolü
npx expo-doctor

# Proje yapısı kontrolü
node scripts/test-setup.js
```

### Test Checklist

- [ ] TypeScript hataları yok
- [ ] Expo doctor tüm kontroller geçiyor
- [ ] iOS simulator'da çalışıyor
- [ ] Android emulator'da çalışıyor
- [ ] Web'de çalışıyor (mümkünse)
- [ ] Accessibility özellikleri çalışıyor
- [ ] Performance sorunları yok

## 📁 Proje Yapısı

```
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Layout configuration
│   ├── index.tsx          # Home screen
│   ├── analyze/           # Analysis flow screens
│   └── recommendations/   # Recommendations screen
├── components/            # Reusable components
│   ├── buttons/          # Button components
│   ├── cards/            # Card components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── ai/                   # AI and audio services
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
├── i18n/                 # Internationalization
├── assets/               # Static assets
└── docs/                 # Documentation
```

## 🎯 Katkı Alanları

### Öncelikli İhtiyaçlar

1. **AI Model Integration**
   - TensorFlow Lite entegrasyonu
   - PyTorch Mobile entegrasyonu
   - Audio preprocessing

2. **UI/UX İyileştirmeleri**
   - Animasyonlar
   - Micro-interactions
   - Dark mode desteği

3. **Testing**
   - Unit testler
   - Integration testler
   - E2E testler

4. **Performance**
   - Bundle size optimization
   - Memory leak kontrolü
   - Loading time iyileştirmeleri

5. **Accessibility**
   - Screen reader desteği
   - Keyboard navigation
   - High contrast mode

### Kolay Başlangıç İssue'ları

`good first issue` etiketi ile işaretlenmiş issue'lara bakın.

## 🐛 Bug Raporları

### Bug Raporu Template'i

```markdown
## Bug Açıklaması
Kısa ve net bug açıklaması

## Tekrar Etme Adımları
1. '...' sayfasına git
2. '...' butonuna tıkla
3. '...' yap
4. Hatayı gör

## Beklenen Davranış
Ne olmasını bekliyordunuz

## Screenshots
Varsa screenshot ekleyin

## Cihaz Bilgileri
- OS: [iOS 16.0 / Android 13]
- Device: [iPhone 14 / Samsung Galaxy S22]
- App Version: [1.0.0]
- Expo Version: [51.0.0]

## Ek Bilgiler
Başka önemli detaylar
```

## 💡 Feature İstekleri

### Feature Request Template'i

```markdown
## Özellik Açıklaması
Hangi özelliği istiyorsunuz

## Problem
Bu özellik hangi problemi çözecek

## Çözüm
Önerilen çözümün detaylı açıklaması

## Alternatifler
Düşündüğünüz alternatif çözümler

## Ek Bilgiler
Mockup'lar, örnekler, referanslar
```

## 📞 İletişim

- **GitHub Issues**: Teknik sorular ve bug raporları için
- **Discussions**: Genel tartışmalar için
- **Email**: Özel konular için

## 🙏 Teşekkür

Katkınız için teşekkür ederiz! Her türlü katkı değerlidir:

- 🐛 Bug raporları
- 💡 Feature önerileri  
- 📝 Dokümantasyon iyileştirmeleri
- 🧪 Test yazma
- 💻 Kod katkıları
- 🎨 UI/UX iyileştirmeleri
- 🌍 Çeviri katkıları

Projeyi ⭐ yıldızlamayı unutmayın!