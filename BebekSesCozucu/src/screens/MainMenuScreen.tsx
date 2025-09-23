import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type MainMenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenuScreen: React.FC = () => {
  const navigation = useNavigation<MainMenuScreenNavigationProp>();

  const menuItems = [
    {
      id: 'cryingAnalysis',
      title: 'Ağlama Analizi',
      subtitle: '🎤',
      description: 'Bebek ağlamasını analiz et',
      onPress: () => navigation.navigate('CryingAnalysis'),
      color: '#FFE4E1',
      iconColor: '#FF6B6B',
    },
    {
      id: 'calmingGuide',
      title: 'Sakinleştirme Rehberi',
      subtitle: '📖',
      description: 'Sakinleştirme yöntemleri',
      onPress: () => navigation.navigate('CalmingGuide'),
      color: '#E0F7FA',
      iconColor: '#00BCD4',
    },
    {
      id: 'audioCalmers',
      title: 'Sesli Sakinleştiriciler',
      subtitle: '🌙',
      description: 'Bebeği sakinleştiren sesler',
      onPress: () => navigation.navigate('AudioCalmers'),
      color: '#E8F5E8',
      iconColor: '#4CAF50',
    },
    {
      id: 'dailyTracker',
      title: 'Günlük Takipçi',
      subtitle: '📅',
      description: 'Emzirme, uyku ve bez değişimi',
      onPress: () => navigation.navigate('DailyTracker'),
      color: '#FFF3E0',
      iconColor: '#FF9800',
    },
    {
      id: 'babyProfile',
      title: 'Bebek Profili',
      subtitle: '👶',
      description: 'Bebek bilgileri yönetimi',
      onPress: () => navigation.navigate('BabyProfile'),
      color: '#F3E5F5',
      iconColor: '#9C27B0',
    },
    {
      id: 'expertOpinions',
      title: 'Uzman Görüşleri',
      subtitle: '👩‍⚕️',
      description: 'Pediatri ve uzman tavsiyeleri',
      onPress: () => navigation.navigate('ExpertOpinions'),
      color: '#E3F2FD',
      iconColor: '#2196F3',
    },
    {
      id: 'aiFeedback',
      title: 'AI Geri Bildirim',
      subtitle: '🧠',
      description: 'AI doğruluğunu değerlendir',
      onPress: () => navigation.navigate('AIFeedback'),
      color: '#FCE4EC',
      iconColor: '#E91E63',
    },
    {
      id: 'faqEducation',
      title: 'SSS & Eğitim',
      subtitle: '❓',
      description: 'Sık sorulan sorular',
      onPress: () => navigation.navigate('FAQEducation'),
      color: '#F1F8E9',
      iconColor: '#8BC34A',
    },
  ];

  const bottomItems = [
    {
      id: 'community',
      title: 'Topluluk',
      subtitle: '💬',
      description: 'Ebeveyn forumu',
      onPress: () => navigation.navigate('Community'),
      color: '#E0E0E0',
      iconColor: '#757575',
    },
    {
      id: 'dailyTip',
      title: 'Günün İpucu',
      subtitle: '📢',
      description: 'Günlük tavsiyeler',
      onPress: () => navigation.navigate('DailyTip'),
      color: '#FFF8E1',
      iconColor: '#FFC107',
    },
    {
      id: 'settings',
      title: 'Ayarlar',
      subtitle: '⚙️',
      description: 'Uygulama ayarları',
      onPress: () => navigation.navigate('Settings'),
      color: '#F5F5F5',
      iconColor: '#9E9E9E',
    },
  ];

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, { backgroundColor: item.color }]}
      onPress={item.onPress}
      activeOpacity={0.8}>
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemHeader}>
          <Text style={[styles.menuIcon, { color: item.iconColor }]}>
            {item.subtitle}
          </Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBottomItem = (item: typeof bottomItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.bottomItem, { backgroundColor: item.color }]}
      onPress={item.onPress}
      activeOpacity={0.8}>
      <Text style={[styles.bottomIcon, { color: item.iconColor }]}>
        {item.subtitle}
      </Text>
      <Text style={styles.bottomTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bebeğinizin dilini anlamanın yeni yolu</Text>
          <Text style={styles.appTitle}>Bebek Ses Çözücü</Text>

          {/* Central Microphone Button */}
          <TouchableOpacity
            style={styles.microphoneButton}
            onPress={() => navigation.navigate('CryingAnalysis')}
            activeOpacity={0.8}>
            <Text style={styles.microphoneIcon}>🎤</Text>
          </TouchableOpacity>
        </View>

        {/* Main Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomContainer}>
          {bottomItems.map(renderBottomItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  microphoneButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#9370DB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  microphoneIcon: {
    fontSize: 40,
    color: 'white',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuItem: {
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  menuItemContent: {
    padding: 20,
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  bottomItem: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  bottomIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  bottomTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default MainMenuScreen;