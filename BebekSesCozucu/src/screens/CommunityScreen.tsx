import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommunityScreen: React.FC = () => {
  const topics = [
    { name: 'Uyku Sorunları', icon: '😴', posts: 156 },
    { name: 'Beslenme', icon: '🥛', posts: 203 },
    { name: 'Gaz ve Kolik', icon: '💨', posts: 89 },
    { name: 'Gelişim', icon: '📈', posts: 134 },
    { name: 'Sağlık', icon: '🩺', posts: 78 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Topluluk</Text>
          <Text style={styles.subtitle}>Deneyimlerinizi paylaşın ve destek alın</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.infoText}>
            Anonim olarak diğer ebeveynlerle deneyimlerinizi paylaşabilirsiniz.
          </Text>

          <View style={styles.topicsContainer}>
            {topics.map((topic, index) => (
              <TouchableOpacity key={index} style={styles.topicCard}>
                <Text style={styles.topicIcon}>{topic.icon}</Text>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicName}>{topic.name}</Text>
                  <Text style={styles.topicPosts}>{topic.posts} paylaşım</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.newPostButton}>
            <Text style={styles.newPostButtonText}>+ Yeni Paylaşım</Text>
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
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  topicsContainer: {
    marginBottom: 20,
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  topicIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topicPosts: {
    fontSize: 12,
    color: '#9370DB',
  },
  newPostButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  newPostButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CommunityScreen;