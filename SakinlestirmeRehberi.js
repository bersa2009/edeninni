import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');

const SakinlestirmeRehberi = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  const guideItems = [
    {
      id: 1,
      title: 'Açlık',
      icon: 'local-hospital',
      description: 'Bebek aç olduğunda emzirme önerileri',
      videoUrl: require('./videos/hunger_video.mp4'), // Yerel video dosya yolu
    },
    {
      id: 2,
      title: 'Gaz',
      icon: 'directions-bike',
      description: 'Gaz sorunları için bisiklet hareketi',
      videoUrl: require('./videos/gas_video.mp4'),
    },
    {
      id: 3,
      title: 'Uykusuzluk',
      icon: 'accessibility',
      description: 'Uykusuzluk için kundaklama teknikleri',
      videoUrl: require('./videos/sleep_video.mp4'),
    },
  ];

  const playVideo = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setVideoModalVisible(true);
  };

  const closeVideo = () => {
    setVideoModalVisible(false);
    setSelectedVideo(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Sakinleştirme Rehberi</Text>
        </View>

        <View style={styles.cardsContainer}>
          {guideItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => playVideo(item.videoUrl)}
            >
              <View style={styles.cardContent}>
                <Icon
                  name={item.icon}
                  size={40}
                  color="#4A90E2"
                  style={styles.cardIcon}
                />
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => playVideo(item.videoUrl)}
                >
                  <Icon name="play-circle-filled" size={24} color="#4A90E2" />
                  <Text style={styles.playButtonText}>Oynat</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Video Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={videoModalVisible}
        onRequestClose={closeVideo}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
            <Icon name="close" size={30} color="#4A90E2" />
          </TouchableOpacity>
          {selectedVideo && (
            <Video
              source={selectedVideo}
              style={styles.videoPlayer}
              controls={true}
              resizeMode="contain"
              onError={(error) => console.log('Video Error:', error)}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  cardsContainer: {
    padding: 20,
    paddingTop: 30,
  },
  card: {
    width: width * 0.9,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginLeft: 10,
  },
  playButtonText: {
    marginLeft: 3,
    color: '#4A90E2',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  videoPlayer: {
    width: width,
    height: width * 0.6,
  },
});

export default SakinlestirmeRehberi;