import React, { useEffect, useRef, useState, type ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Audio } from 'expo-av';

type SoundKey = 'white' | 'womb' | 'lullaby';

export default function AudioSoothersScreen(): ReactElement {
  const [current, setCurrent] = useState<SoundKey | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => () => { soundRef.current?.unloadAsync().catch(() => void 0); }, []);

  async function play(kind: SoundKey, minutes = 15): Promise<void> {
    if (soundRef.current) {
      await soundRef.current.stopAsync().catch(() => void 0);
      await soundRef.current.unloadAsync().catch(() => void 0);
    }
    const { sound } = await Audio.Sound.createAsync(
      // Using placeholder local asset for demo; replace with actual assets
      require('../../assets/splash-icon.png'),
      { shouldPlay: true, isLooping: true },
    );
    soundRef.current = sound;
    setCurrent(kind);
    setSecondsLeft(minutes * 60);
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === null) return prev;
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
    setCurrent(null);
    setSecondsLeft(null);
    try {
      await soundRef.current?.stopAsync();
    } catch {}
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sesli Sakinleştiriciler</Text>
      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => play('white', 15)}>
          <Text style={styles.btnText}>Beyaz Gürültü (15dk)</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => play('womb', 15)}>
          <Text style={styles.btnText}>Rahim Sesi (15dk)</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => play('lullaby', 15)}>
          <Text style={styles.btnText}>Türkçe Ninni (15dk)</Text>
        </Pressable>
      </View>
      {current ? (
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Text style={{ color: '#334155' }}>Çalıyor: {current}</Text>
          <Text style={{ color: '#334155', marginVertical: 6 }}>
            Kalan: {secondsLeft !== null ? Math.floor(secondsLeft / 60) + ':' + String(secondsLeft % 60).padStart(2, '0') : '--:--'}
          </Text>
          <Pressable style={[styles.btn, { backgroundColor: '#ef4444' }]} onPress={stop}>
            <Text style={styles.btnText}>Durdur</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  row: { gap: 10 },
  btn: { backgroundColor: '#10b981', padding: 12, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
});

