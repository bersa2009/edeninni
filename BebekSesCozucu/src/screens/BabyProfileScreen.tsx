import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BabyProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Bebek Profili</Text>
          <Text style={styles.subtitle}>Bebeğinizin bilgilerini yönetin</Text>
        </View>

        <View style={styles.profileContainer}>
          <Text style={styles.sectionTitle}>👶 Aktif Profil: Bebek 1</Text>

          <View style={styles.profileSection}>
            <Text style={styles.infoTitle}>Ad: </Text>
            <Text style={styles.infoValue}>Henüz girilmemiş</Text>
          </View>

          <View style={styles.profileSection}>
            <Text style={styles.infoTitle}>Yaş: </Text>
            <Text style={styles.infoValue}>Henüz girilmemiş</Text>
          </View>

          <View style={styles.profileSection}>
            <Text style={styles.infoTitle}>Boy: </Text>
            <Text style={styles.infoValue}>Henüz girilmemiş</Text>
          </View>

          <View style={styles.profileSection}>
            <Text style={styles.infoTitle}>Kilo: </Text>
            <Text style={styles.infoValue}>Henüz girilmemiş</Text>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>✏️ Bilgileri Düzenle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Yeni Bebek Profili Ekle</Text>
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
  profileContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9370DB',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileSection: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  infoTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#9370DB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BabyProfileScreen;