# Bebek Ses Çözücü - Baby Sound Solver

A comprehensive baby monitoring app that helps parents understand their baby's needs through AI-powered cry analysis and provides various caregiving tools.

## Features

### 🎤 Ağlama Analizi (Crying Analysis)
- Records 5-10 second baby cry samples
- AI analyzes cries and provides probability percentages for different needs:
  - Hunger (Açlık)
  - Gas (Gaz)
  - Tiredness (Yorgunluk)
  - Discomfort (Rahatsızlık)
- Suggests appropriate calming methods

### 📖 Sakinleştirme Rehberi (Calming Guide)
- Comprehensive guide with proven calming methods
- Categorized by need type (hunger, gas, tiredness, discomfort)
- Step-by-step instructions with visual guides
- Video demonstrations (placeholder for future implementation)

### 🌙 Sesli Sakinleştiriciler (Audio Calmers)
- White noise and nature sounds
- Traditional Turkish lullabies (Dandini, Fidayda, etc.)
- Customizable timers (15 min, 30 min, 1 hour)
- Womb sounds and heartbeat simulation

### 📅 Günlük Takipçi (Daily Tracker)
- Track feeding, sleep, and diaper changes
- Speech-to-text input support
- Reminder notifications
- Historical data visualization

### 👶 Bebek Profili (Baby Profile)
- Multiple baby profile support
- Age, height, weight tracking
- Personalized recommendations based on age

### 👩‍⚕️ Uzman Görüşleri (Expert Opinions)
- Pediatrician advice and articles
- Sleep consultant recommendations
- Nutrition expert guidance

### 🧠 AI Geri Bildirim (AI Feedback)
- Rate AI analysis accuracy
- Help improve the model with feedback
- Track overall system performance

### ❓ SSS & Eğitim (FAQ & Education)
- Frequently asked questions
- Baby care education content
- Common concerns and solutions

### 💬 Topluluk (Community)
- Anonymous parent forum
- Topic-based discussions
- Experience sharing platform

### 📢 Günün İpucu (Daily Tip)
- Daily developmental tips
- Age-appropriate advice
- Motivational content for parents

### ⚙️ Ayarlar (Settings)
- Language preferences (Turkish/English)
- Theme selection (Light/Dark)
- Privacy settings
- Notification preferences

## Technology Stack

- **React Native** 0.81.4
- **TypeScript**
- **React Navigation** v6
- **React Native Sound** for audio playback
- **React Native Vector Icons**
- **Async Storage** for data persistence

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. For iOS:
   ```bash
   cd ios && pod install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Run on device/emulator:
   ```bash
   npm run android  # or npm run ios
   ```

## Main Menu Structure

The app features a central microphone button for quick access to crying analysis, with organized menu items for all features. The design uses a warm color palette (cream background) with purple accent colors to create a calming, parent-friendly interface.

## Future Enhancements

- Real AI/ML model integration for cry analysis
- Cloud synchronization for multiple devices
- Advanced analytics and reporting
- Integration with smart baby monitors
- Video call with experts
- E-commerce integration for baby products

## Contributing

This app was developed to help parents better understand and care for their babies. Contributions are welcome for feature enhancements and bug fixes.

## License

This project is developed for educational and parental support purposes.
