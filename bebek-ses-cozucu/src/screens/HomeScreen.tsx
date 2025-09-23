import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import MenuTile from '../components/MenuTile';
import type { RootStackParamList } from '../App';
import { useTranslation } from 'react-i18next';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen(): ReactElement {
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.kicker}>{t('appName')}</Text>
      <Text style={styles.title}>Bebek Ses Çözücü</Text>

      <Pressable style={styles.micButton} onPress={() => navigation.navigate('CryAnalysis')}>
        <Ionicons name="mic" size={48} color="#fff" />
      </Pressable>

      <View style={styles.grid}>
        <MenuTile
          icon="alert"
          title={t('menu.cryAnalysis')}
          subtitle="Ağlamayı analiz et"
          backgroundColor="#FFEFE7"
          onPress={() => navigation.navigate('CryAnalysis')}
        />
        <MenuTile
          icon="book"
          title={t('menu.soothingGuide')}
          backgroundColor="#FFF7E6"
          onPress={() => navigation.navigate('SoothingGuide')}
        />
        <MenuTile
          icon="moon"
          title={t('menu.audioSoothers')}
          backgroundColor="#EAF7F3"
          onPress={() => navigation.navigate('AudioSoothers')}
        />
        <MenuTile
          icon="calendar"
          title={t('menu.dailyTracker')}
          backgroundColor="#EDF2FF"
          onPress={() => navigation.navigate('DailyTracker')}
        />
        <MenuTile
          icon="happy"
          title={t('menu.babyProfile')}
          backgroundColor="#FFF0F6"
          onPress={() => navigation.navigate('BabyProfile')}
        />
        <MenuTile
          icon="medkit"
          title={t('menu.expertContent')}
          backgroundColor="#E8FFF1"
          onPress={() => navigation.navigate('ExpertContent')}
        />
        <MenuTile
          icon="help"
          title={t('menu.faq')}
          backgroundColor="#EAF2FF"
          onPress={() => navigation.navigate('FAQ')}
        />
      </View>

      <View style={styles.bottomRow}>
        <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('Community')}>
          <Ionicons name="chatbubbles-outline" size={20} color="#0f172a" />
          <Text style={styles.bottomText}>{t('menu.community')}</Text>
        </Pressable>
        <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('TipOfDay')}>
          <Ionicons name="megaphone-outline" size={20} color="#0f172a" />
          <Text style={styles.bottomText}>{t('menu.tipOfDay')}</Text>
        </Pressable>
        <Pressable style={styles.bottomBtn} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={20} color="#0f172a" />
          <Text style={styles.bottomText}>{t('menu.settings')}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  kicker: {
    marginTop: 12,
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
  },
  title: {
    marginTop: 4,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#0f172a',
  },
  micButton: {
    alignSelf: 'center',
    marginVertical: 24,
    width: 140,
    height: 140,
    borderRadius: 80,
    backgroundColor: '#A78BFA',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  grid: {
    gap: 12,
  },
  bottomRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  bottomText: {
    color: '#0f172a',
    fontWeight: '600',
  },
});

