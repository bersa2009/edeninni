import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExpertOpinionsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Uzman Görüşleri</Text>
          <Text style={styles.subtitle}>Güvenilir uzman tavsiyeleri</Text>
        </View>

        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.articleCard}>
            <Text style={styles.articleIcon}>🩺</Text>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Bebeklerde Gaz Sancısı</Text>
              <Text style={styles.articleAuthor}>Dr. Ayşe Yılmaz - Pediatri</Text>
              <Text style={styles.articlePreview}>
                Gaz sancısı belirtileri ve evde uygulanabilecek yöntemler...
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.articleCard}>
            <Text style={styles.articleIcon}>😴</Text>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Sağlıklı Uyku Düzeni</Text>
              <Text style={styles.articleAuthor}>Uzm. Psk. Mehmet Kaya</Text>
              <Text style={styles.articlePreview}>
                Bebeklerde uyku eğitimi ve rutin oluşturma...
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.articleCard}>
            <Text style={styles.articleIcon}>🥛</Text>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>Emzirme Teknikleri</Text>
              <Text style={styles.articleAuthor}>Dr. Fatma Şahin - Çocuk Sağlığı</Text>
              <Text style={styles.articlePreview}>
                Doğru emzirme pozisyonları ve sık yapılan hatalar...
              </Text>
            </View>
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
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  articleIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  articleAuthor: {
    fontSize: 14,
    color: '#9370DB',
    marginBottom: 10,
  },
  articlePreview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ExpertOpinionsScreen;