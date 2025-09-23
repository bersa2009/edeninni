import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CalmingMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  videoUrl?: string;
  steps: string[];
  duration: string;
  category: 'hunger' | 'gas' | 'tiredness' | 'discomfort';
}

const CalmingGuideScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const calmingMethods: CalmingMethod[] = [
    {
      id: 'breastfeeding',
      title: 'Emzirme',
      description: 'Bebeğinizi sakinleştirmenin en doğal yolu',
      icon: '🤱',
      category: 'hunger',
      duration: '15-20 dakika',
      steps: [
        'Rahat bir pozisyon alın',
        'Bebeğinizi göğsünüze yaklaştırın',
        'Doğru emzirme pozisyonunu sağlayın',
        'Sakin ve huzurlu bir ortam oluşturun',
      ],
    },
    {
      id: 'bicycle',
      title: 'Bisiklet Hareketi',
      description: 'Gaz sancılarını gidermek için etkili',
      icon: '🚲',
      category: 'gas',
      duration: '5-10 dakika',
      steps: [
        'Bebeğinizi sırt üstü yatırın',
        'Bacaklarını nazikçe kavrayın',
        'Bisiklet pedalı çevirir gibi hareket ettirin',
        'Yavaş ve ritmik hareketler yapın',
      ],
    },
    {
      id: 'swaddling',
      title: 'Kundaklama',
      description: 'Bebeğinizi güvende hissettirir',
      icon: '🛌',
      category: 'tiredness',
      duration: 'Tüm uyku süresi',
      steps: [
        'Geniş bir örtü hazırlayın',
        'Bebeğinizi sırt üstü yatırın',
        'Kollarını vücuduna yaklaştırın',
        'Örtüyü sıkıca sarın (ama rahat)',
      ],
    },
    {
      id: 'diaper',
      title: 'Bez Değişimi',
      description: 'Islak bez rahatsızlığını giderir',
      icon: '🧷',
      category: 'discomfort',
      duration: '5 dakika',
      steps: [
        'Değişim masasını hazırlayın',
        'Bebeğinizi sırt üstü yatırın',
        'Kirli bezi nazikçe çıkarın',
        'Temiz bez takın',
      ],
    },
    {
      id: 'white_noise',
      title: 'Beyaz Gürültü',
      description: 'Rahim içi sesleri taklit eder',
      icon: '🔊',
      category: 'tiredness',
      duration: 'Sürekli',
      steps: [
        'Beyaz gürültü cihazını çalıştırın',
        'Orta seviyede ses ayarlayın',
        'Bebeğin yanına yerleştirin',
        'Gece boyu açık bırakabilirsiniz',
      ],
    },
    {
      id: 'rocking',
      title: 'Sallama',
      description: 'Bebeği sakinleştiren ritmik hareket',
      icon: '🤗',
      category: 'discomfort',
      duration: '5-15 dakika',
      steps: [
        'Bebeğinizi kucağınıza alın',
        'Yavaş ve ritmik sallayın',
        'Şarkı söyleyin veya ninni okuyun',
        'Göz teması kurun',
      ],
    },
  ];

  const categories = [
    { id: 'all', name: 'Tümü', icon: '📚' },
    { id: 'hunger', name: 'Açlık', icon: '🍽️' },
    { id: 'gas', name: 'Gaz', icon: '💨' },
    { id: 'tiredness', name: 'Yorgunluk', icon: '😴' },
    { id: 'discomfort', name: 'Rahatsızlık', icon: '😣' },
  ];

  const filteredMethods = selectedCategory === 'all'
    ? calmingMethods
    : calmingMethods.filter(method => method.category === selectedCategory);

  const renderMethodCard = (method: CalmingMethod) => (
    <TouchableOpacity
      key={method.id}
      style={styles.methodCard}
      onPress={() => {
        Alert.alert(
          method.title,
          method.description,
          [
            { text: 'İptal', style: 'cancel' },
            {
              text: 'Adımları Göster',
              onPress: () => {
                Alert.alert(
                  `${method.title} - Adımlar`,
                  method.steps.map((step, index) => `${index + 1}. ${step}`).join('\n\n'),
                  [{ text: 'Tamam' }]
                );
              }
            },
          ]
        );
      }}>
      <View style={styles.methodHeader}>
        <Text style={styles.methodIcon}>{method.icon}</Text>
        <View style={styles.methodInfo}>
          <Text style={styles.methodTitle}>{method.title}</Text>
          <Text style={styles.methodDuration}>⏱️ {method.duration}</Text>
        </View>
      </View>
      <Text style={styles.methodDescription}>{method.description}</Text>
      <TouchableOpacity style={styles.watchButton}>
        <Text style={styles.watchButtonText}>▶️ İzle</Text>
      </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Sakinleştirme Rehberi</Text>
          <Text style={styles.subtitle}>
            Bebeğinizi sakinleştirmek için kanıtlanmış yöntemler
          </Text>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}>
          {categories.map(renderCategoryButton)}
        </ScrollView>

        {/* Methods List */}
        <View style={styles.methodsContainer}>
          {filteredMethods.map(renderMethodCard)}
        </View>

        {/* Quick Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Hızlı İpuçları</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>
              • Her zaman sakin ve sabırlı olun
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>
              • Bebeğinizin ihtiyaçlarını gözlemleyin
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>
              • Rutin oluşturmak güven verir
            </Text>
          </View>
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
  methodsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  methodCard: {
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
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  methodIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  methodDuration: {
    fontSize: 14,
    color: '#9370DB',
    fontWeight: '500',
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  watchButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  watchButtonText: {
    color: 'white',
    fontSize: 14,
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
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default CalmingGuideScreen;