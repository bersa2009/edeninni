import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  tr: {
    translation: {
      appName: 'Bebek Ses Çözücü',
      menu: {
        cryAnalysis: 'Ağlama Analizi',
        soothingGuide: 'Sakinleştirme Rehberi',
        audioSoothers: 'Sesli Sakinleştiriciler',
        dailyTracker: 'Günlük Takipçi',
        babyProfile: 'Bebek Profili',
        expertContent: 'Uzman Görüşleri',
        aiFeedback: 'AI Geri Bildirim',
        faq: 'SSS & Eğitim',
        community: 'Topluluk',
        tipOfDay: 'Günün İpucu',
        settings: 'Ayarlar',
      },
      startRecording: 'Kaydı Başlat',
      stopRecording: 'Durdur',
    },
  },
  en: {
    translation: {
      appName: 'Baby Cry Decoder',
      menu: {
        cryAnalysis: 'Cry Analysis',
        soothingGuide: 'Soothing Guide',
        audioSoothers: 'Audio Soothers',
        dailyTracker: 'Daily Tracker',
        babyProfile: 'Baby Profile',
        expertContent: 'Expert Advice',
        aiFeedback: 'AI Feedback',
        faq: 'FAQ & Training',
        community: 'Community',
        tipOfDay: 'Tip of the Day',
        settings: 'Settings',
      },
      startRecording: 'Start',
      stopRecording: 'Stop',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: Localization.getLocales()?.[0]?.languageCode || 'tr',
  fallbackLng: 'tr',
  interpolation: { escapeValue: false },
});

export default i18n;

