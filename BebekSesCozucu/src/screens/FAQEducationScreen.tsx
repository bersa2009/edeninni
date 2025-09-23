import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQEducationScreen: React.FC = () => {
  const faqItems = [
    {
      question: 'Bebek neden hıçkırır?',
      answer: 'Bebeklerde hıçkırık genellikle zararsızdır ve sindirim sistemi gelişiminin normal bir parçasıdır.',
    },
    {
      question: 'İshal ne zaman tehlikeli olur?',
      answer: 'Sık ishal, ateş, kusma veya kanlı dışkı durumunda mutlaka doktora başvurun.',
    },
    {
      question: 'Gaz sancısı nasıl anlaşılır?',
      answer: 'Ağlama nöbetleri, şişkinlik, dizlerini karına çekme gibi belirtiler gaz sancısı göstergesi olabilir.',
    },
    {
      question: 'Bebek ne zaman desteksiz oturabilir?',
      answer: 'Çoğu bebek 6-8 aylıkken desteksiz oturabilir, ancak her bebek farklı gelişir.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>SSS & Eğitim</Text>
          <Text style={styles.subtitle}>Sık sorulan sorular ve pratik bilgiler</Text>
        </View>

        <View style={styles.contentContainer}>
          {faqItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.faqCard}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>{item.answer}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>Daha Fazla Soru</Text>
          </TouchableOpacity>
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
  faqCard: {
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
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9370DB',
    marginBottom: 10,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  moreButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  moreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FAQEducationScreen;