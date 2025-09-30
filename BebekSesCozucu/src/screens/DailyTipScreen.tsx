import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DailyTipScreen: React.FC = () => {
  const tips = [
    {
      title: 'Gülümseme Zamanı',
      content: 'Bebeğinizin ilk gülümsemesi genelde 6. haftada olur 🌸',
      category: 'Gelişim',
    },
    {
      title: 'Uyku Düzeni',
      content: '3 aylık bebekler günde yaklaşık 15-16 saat uyur',
      category: 'Uyku',
    },
    {
      title: 'Karın Üstü Zamanı',
      content: 'Günde 20-30 dakika karın üstü pozisyon bebek gelişimi için önemli',
      category: 'Motor Gelişim',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Günün İpucu</Text>
          <Text style={styles.subtitle}>Günlük pratik tavsiyeler</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.todayTip}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipTitle}>Bugünün İpucu</Text>
            <Text style={styles.tipContent}>
              {tips[0].content}
            </Text>
            <Text style={styles.tipCategory}>{tips[0].category}</Text>
          </View>

          <Text style={styles.previousTitle}>Önceki İpuçları</Text>
          {tips.slice(1).map((tip, index) => (
            <View key={index} style={styles.previousTip}>
              <Text style={styles.previousTipContent}>{tip.content}</Text>
              <Text style={styles.previousTipCategory}>{tip.category}</Text>
            </View>
          ))}
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
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  todayTip: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderLeftWidth: 5,
    borderLeftColor: '#9370DB',
  },
  tipIcon: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  tipContent: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 15,
  },
  tipCategory: {
    fontSize: 12,
    color: '#9370DB',
    textAlign: 'center',
    fontWeight: '500',
  },
  previousTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  previousTip: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  previousTipContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  previousTipCategory: {
    fontSize: 10,
    color: '#9370DB',
    fontWeight: '500',
  },
});

export default DailyTipScreen;