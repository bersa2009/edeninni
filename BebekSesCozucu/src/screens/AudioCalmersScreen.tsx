import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

interface AudioItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  soundFile: string;
  duration: string;
  category: 'white_noise' | 'lullaby' | 'nature';
}

const AudioCalmersScreen: React.FC = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [timer, setTimer] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const audioItems: AudioItem[] = [
    {
      id: 'white_noise',
      title: 'Beyaz Gürültü',
      description: 'Rahim içi sesleri taklit eder',
      icon: '🔊',
      soundFile: 'white_noise.mp3',
      duration: 'Sürekli',
      category: 'white_noise',
    },
    {
      id: 'rain',
      title: 'Yağmur Sesi',
      description: 'Sakinleştirici doğal ses',
      icon: '🌧️',
      soundFile: 'rain.mp3',
      duration: 'Sürekli',
      category: 'nature',
    },
    {
      id: 'ocean',
      title: 'Okyanus Dalgaları',
      description: 'Rahatlatıcı ritmik sesler',
      icon: '🌊',
      soundFile: 'ocean.mp3',
      duration: 'Sürekli',
      category: 'nature',
    },
    {
      id: 'heartbeat',
      title: 'Kalp Atışı',
      description: 'Rahim içi kalp sesi',
      icon: '❤️',
      soundFile: 'heartbeat.mp3',
      duration: 'Sürekli',
      category: 'white_noise',
    },
    {
      id: 'dandini',
      title: 'Dandini Dandini',
      description: 'Geleneksel Türk ninnisi',
      icon: '🎵',
      soundFile: 'dandini.mp3',
      duration: '3:24',
      category: 'lullaby',
    },
    {
      id: 'fidayda',
      title: 'Fidayda',
      description: 'Anadolu ninnisi',
      icon: '🎶',
      soundFile: 'fidayda.mp3',
      duration: '2:45',
      category: 'lullaby',
    },
    {
      id: 'uyku',
      title: 'Uyku Zamanı',
      description: 'Yumuşak melodi',
      icon: '😴',
      soundFile: 'sleep.mp3',
      duration: '4:12',
      category: 'lullaby',
    },
  ];

  const categories = [
    { id: 'all', name: 'Tümü', icon: '🎧' },
    { id: 'white_noise', name: 'Beyaz Gürültü', icon: '🔊' },
    { id: 'lullaby', name: 'Ninniler', icon: '🎵' },
    { id: 'nature', name: 'Doğa Sesleri', icon: '🌿' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? audioItems
    : audioItems.filter(item => item.category === selectedCategory);

  const playSound = (audioItem: AudioItem) => {
    // Stop current sound if playing
    if (sound) {
      sound.stop();
      sound.release();
    }

    if (timer) {
      clearInterval(timer);
    }

    // In a real app, you would load actual sound files
    // For now, we'll simulate the functionality
    Alert.alert(
      `${audioItem.title}`,
      `${audioItem.description}\n\nSüre: ${audioItem.duration}`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çal',
          onPress: () => {
            setCurrentlyPlaying(audioItem.id);

            // Simulate sound playing
            const mockSound = new Sound('dummy.mp3', Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('Failed to load sound', error);
                return;
              }
              mockSound.play();
            });

            setSound(mockSound);

            // Auto-stop after 15 minutes (900 seconds) for lullabies
            if (audioItem.category === 'lullaby') {
              const stopTimer = setTimeout(() => {
                stopSound();
              }, 900000);
              setTimer(stopTimer);
            }
          }
        },
      ]
    );
  };

  const stopSound = () => {
    if (sound) {
      sound.stop();
      sound.release();
      setSound(null);
    }
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
    setCurrentlyPlaying(null);
  };

  const setTimerForSound = (minutes: number) => {
    if (timer) {
      clearInterval(timer);
    }

    const stopTimer = setTimeout(() => {
      stopSound();
    }, minutes * 60 * 1000);

    setTimer(stopTimer);

    Alert.alert(
      'Zamanlayıcı Ayarlandı',
      `${minutes} dakika sonra otomatik kapanacak`,
      [{ text: 'Tamam' }]
    );
  };

  const renderAudioCard = (item: AudioItem) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.audioCard,
        currentlyPlaying === item.id && styles.playingCard,
      ]}
      onPress={() => playSound(item)}>
      <View style={styles.audioHeader}>
        <Text style={styles.audioIcon}>{item.icon}</Text>
        <View style={styles.audioInfo}>
          <Text style={styles.audioTitle}>{item.title}</Text>
          <Text style={styles.audioDuration}>{item.duration}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.playButton,
            currentlyPlaying === item.id && styles.stopButton,
          ]}
          onPress={() => {
            if (currentlyPlaying === item.id) {
              stopSound();
            } else {
              playSound(item);
            }
          }}>
          <Text style={styles.playButtonText}>
            {currentlyPlaying === item.id ? '⏹️' : '▶️'}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.audioDescription}>{item.description}</Text>

      {currentlyPlaying === item.id && (
        <View style={styles.timerContainer}>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={() => setTimerForSound(15)}>
            <Text style={styles.timerButtonText}>15 dk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={() => setTimerForSound(30)}>
            <Text style={styles.timerButtonText}>30 dk</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={() => setTimerForSound(60)}>
            <Text style={styles.timerButtonText}>1 saat</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderCategoryButton = (category: typeof categories[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(category.id)}>
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === category.id && styles.categoryTextActive,
        ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (sound) {
        sound.stop();
        sound.release();
      }
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Sesli Sakinleştiriciler</Text>
          <Text style={styles.subtitle}>
            Bebeğinizi sakinleştirmek için özel sesler
          </Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}>
          {categories.map(renderCategoryButton)}
        </ScrollView>

        {/* Audio Items */}
        <View style={styles.audioContainer}>
          {filteredItems.map(renderAudioCard)}
        </View>

        {/* Usage Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Kullanım İpuçları</Text>
          <Text style={styles.tipText}>
            • Ses seviyesini orta ayarda tutun (60-70 dB)
          </Text>
          <Text style={styles.tipText}>
            • Bebeğinizden 1-2 metre uzağa yerleştirin
          </Text>
          <Text style={styles.tipText}>
            • Gece boyu beyaz gürültü çalabilirsiniz
          </Text>
          <Text style={styles.tipText}>
            • Ninnileri emzirme sırasında çalın
          </Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  categoryButtonActive: {
    backgroundColor: '#9370DB',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: 'white',
  },
  audioContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  audioCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  playingCard: {
    borderColor: '#9370DB',
    borderWidth: 2,
  },
  audioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  audioIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  audioDuration: {
    fontSize: 14,
    color: '#9370DB',
    fontWeight: '500',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9370DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#FF4444',
  },
  playButtonText: {
    fontSize: 20,
    color: 'white',
  },
  audioDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timerButton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  timerButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  tipsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default AudioCalmersScreen;