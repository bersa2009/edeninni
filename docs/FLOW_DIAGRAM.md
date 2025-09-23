# Bebek Ses Çözücü - Akış Diyagramı

## 🔄 Genel Uygulama Akışı

```mermaid
graph TD
    A[Ana Menü] --> B[Analize Başla]
    B --> C[Kayıt Ekranı]
    C --> D{Mikrofon İzni}
    D -->|İzin Var| E[Kayıt Başlat]
    D -->|İzin Yok| F[İzin İsteği]
    F -->|İzin Verildi| E
    F -->|İzin Reddedildi| G[Hata Mesajı]
    G --> C
    
    E --> H[Kayıt Devam Ediyor]
    H --> I[Kayıt Durdur]
    I --> J[Analiz Ekranı]
    J --> K[AI Servisi Çağrısı]
    K --> L[Sonuç Ekranı]
    L --> M[Önerileri Gör]
    L --> N[Tekrar Analiz Et]
    L --> O[Ana Menüye Dön]
    
    M --> P[Öneriler Ekranı]
    P --> Q[Yeni Analiz Yap]
    P --> R[Geri Dön]
    
    N --> C
    Q --> C
    R --> L
    O --> A
```

## 📱 Ekran Bazında Detaylı Akış

### 1. Ana Menü (`app/index.tsx`)
```mermaid
graph LR
    A[Ana Menü] --> B[Analize Başla Butonu]
    B --> C[/analyze rotasına git]
```

**Özellikler:**
- Uygulama başlangıç noktası
- Basit ve temiz arayüz
- Tek ana aksiyon butonu

### 2. Kayıt Ekranı (`app/analyze/index.tsx`)
```mermaid
graph TD
    A[Kayıt Ekranı] --> B{Mikrofon İzni Kontrolü}
    B -->|iOS| C[Expo Audio İzni]
    B -->|Android| D[Runtime Permission + Expo Audio]
    C --> E{İzin Durumu}
    D --> E
    E -->|Granted| F[Mikrofon Butonu Aktif]
    E -->|Denied| G[Hata Mesajı]
    
    F --> H[Kullanıcı Butona Tıklar]
    H --> I{Kayıt Durumu}
    I -->|Idle| J[Kayıt Başlat]
    I -->|Recording| K[Kayıt Durdur]
    
    J --> L[Kayıt Göstergesi]
    L --> M[Kullanıcı Tekrar Tıklar]
    M --> K
    
    K --> N[Audio Dosyası Oluştur]
    N --> O[Analiz Ekranına Git]
    O --> P[analyzing.tsx]
```

**Durum Yönetimi:**
- `recording: boolean` - Kayıt durumu
- `isProcessing: boolean` - İşlem durumu
- Hata yönetimi ve kullanıcı geri bildirimi

### 3. Analiz Ekranı (`app/analyze/analyzing.tsx`)
```mermaid
graph TD
    A[Analiz Ekranı] --> B[Audio Path Alınır]
    B --> C[Progress Ring Gösterilir]
    C --> D[AiService.analyze çağrısı]
    D --> E{Analiz Sonucu}
    E -->|Başarılı| F[Sonuç Ekranına Git]
    E -->|Hata| G[Kayıt Ekranına Geri Dön]
    
    F --> H[result.tsx]
    G --> I[analyze/index.tsx]
```

**İşlem Adımları:**
1. Audio path parametresi alınır
2. Loading göstergesi başlatılır
3. AI servisi çağrılır (mock data)
4. Sonuç ekranına yönlendirme

### 4. Sonuç Ekranı (`app/analyze/result.tsx`)
```mermaid
graph TD
    A[Sonuç Ekranı] --> B[JSON Parse İşlemi]
    B --> C[Sonuçları Sırala]
    C --> D[En Yüksek Olasılık]
    D --> E[Sonuç Kartları]
    E --> F[Aksiyon Butonları]
    
    F --> G[Önerileri Gör]
    F --> H[Tekrar Analiz Et]
    F --> I[Ana Menüye Dön]
    
    G --> J[recommendations/index.tsx]
    H --> K[analyze/index.tsx]
    I --> L[index.tsx]
```

**Veri İşleme:**
- JSON parse ve hata kontrolü
- Yüzdelik sıralama
- Renk kodlaması (Açlık: yeşil, Gaz: turuncu, Yorgunluk: mavi)

### 5. Öneriler Ekranı (`app/recommendations/index.tsx`)
```mermaid
graph TD
    A[Öneriler Ekranı] --> B[Cry Type Parametresi]
    B --> C{Öneri Türü}
    C -->|hunger| D[Açlık Önerileri]
    C -->|gas| E[Gaz Önerileri] 
    C -->|fatigue| F[Yorgunluk Önerileri]
    
    D --> G[Adımlar + İpuçları]
    E --> G
    F --> G
    
    G --> H[Genel Hatırlatmalar]
    H --> I[Aksiyon Butonları]
    I --> J[Yeni Analiz Yap]
    I --> K[Geri Dön]
```

## 🔧 Teknik Akış Diyagramları

### AI Servisi Akışı
```mermaid
graph TD
    A[Audio File Path] --> B[AiService.analyze]
    B --> C[Mock Processing Delay]
    C --> D[Random Result Generation]
    D --> E[Result Normalization]
    E --> F[AnalysisResult Object]
    
    F --> G{Future Implementation}
    G --> H[Audio Preprocessing]
    G --> I[TensorFlow Lite Model]
    G --> J[PyTorch Mobile Model]
    
    H --> K[MFCC Feature Extraction]
    I --> L[Model Inference]
    J --> L
    K --> L
    L --> M[Post-processing]
    M --> N[Final Result]
```

### Hata Yönetimi Akışı
```mermaid
graph TD
    A[Uygulama Hatası] --> B[Error Boundary]
    B --> C{Hata Türü}
    C -->|Component Error| D[Fallback UI]
    C -->|Network Error| E[Retry Mekanizması]
    C -->|Permission Error| F[İzin İsteği]
    C -->|File System Error| G[Storage Cleanup]
    
    D --> H[Kullanıcı Feedback]
    E --> H
    F --> H
    G --> H
    
    H --> I[Error Reporting]
    H --> J[Recovery Action]
```

### Veri Akışı
```mermaid
graph LR
    A[User Input] --> B[Component State]
    B --> C[Local Storage]
    B --> D[AI Service]
    D --> E[Analysis Result]
    E --> F[Navigation Params]
    F --> G[Next Screen]
    
    C --> H[AsyncStorage]
    H --> I[User Preferences]
    H --> J[Analysis History]
    H --> K[App Settings]
```

## 📊 Durum Makinesi

### Kayıt Durum Makinesi
```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> RequestingPermission : START_RECORD
    RequestingPermission --> Recording : PERMISSION_GRANTED
    RequestingPermission --> Error : PERMISSION_DENIED
    Recording --> Processing : STOP_RECORD
    Processing --> Idle : ANALYSIS_COMPLETE
    Processing --> Error : ANALYSIS_ERROR
    Error --> Idle : RESET
```

### Uygulama Durumları
```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Home : APP_LOADED
    Home --> Analyzing : START_ANALYSIS
    Analyzing --> Recording : NAVIGATE_TO_RECORD
    Recording --> Processing : AUDIO_RECORDED
    Processing --> Results : ANALYSIS_DONE
    Results --> Recommendations : VIEW_RECOMMENDATIONS
    Results --> Analyzing : REPEAT_ANALYSIS
    Results --> Home : GO_HOME
    Recommendations --> Analyzing : NEW_ANALYSIS
    Recommendations --> Results : GO_BACK
```

## 🔄 Veri Akış Patterns

### Component Props Flow
```mermaid
graph TD
    A[App State] --> B[Screen Components]
    B --> C[UI Components]
    C --> D[User Actions]
    D --> E[Event Handlers]
    E --> F[State Updates]
    F --> A
```

### Service Layer Integration
```mermaid
graph LR
    A[UI Layer] --> B[Service Layer]
    B --> C[AI Service]
    B --> D[Audio Service]
    B --> E[Storage Service]
    B --> F[API Service]
    
    C --> G[Mock/Real Model]
    D --> H[Expo AV]
    E --> I[AsyncStorage]
    F --> J[Backend API]
```

Bu diyagramlar, uygulamanın tüm akışlarını ve bileşenler arası etkileşimlerini detaylı bir şekilde göstermektedir. Geliştirme sürecinde referans olarak kullanılabilir.