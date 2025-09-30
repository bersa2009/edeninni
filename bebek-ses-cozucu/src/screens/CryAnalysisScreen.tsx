import React, { useEffect, useRef, useState, type ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'CryAnalysis'>;

export default function CryAnalysisScreen({ navigation }: Props): ReactElement {
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number>(10);
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        recordingRef.current.stopAndUnloadAsync().catch(() => void 0);
      }
    };
  }, []);

  async function start(): Promise<void> {
    const { status } = await Audio.requestPermissionsAsync();
    if (!status || status !== 'granted') return;
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    await recording.startAsync();
    recordingRef.current = recording;
    setIsRecording(true);
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function stop(): Promise<void> {
    if (!recordingRef.current) return;
    try {
      await recordingRef.current.stopAndUnloadAsync();
    } catch {}
    setIsRecording(false);
    // Mock AI inference
    setTimeout(() => {
      navigation.replace('CryResult', {
        probabilities: { hunger: 0.7, gas: 0.2, fatigue: 0.1 },
      });
    }, 600);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5–10 sn ağlamayı kaydedin</Text>
      <Text style={styles.subtitle}>Otomatik olarak analiz edeceğiz</Text>

      <Pressable style={[styles.recBtn, isRecording && styles.recBtnActive]} onPress={isRecording ? stop : start}>
        <Text style={styles.recText}>{isRecording ? `Durdur (${countdown})` : 'Kaydı Başlat'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#334155', marginTop: 6 },
  recBtn: {
    marginTop: 24,
    backgroundColor: '#10b981',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
  },
  recBtnActive: { backgroundColor: '#ef4444' },
  recText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

