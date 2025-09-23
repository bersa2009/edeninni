import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'CryResult'>;

function Percent({ label, value }: { label: string; value: number }) {
  const percent = Math.round(value * 100);
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{percent}%</Text>
    </View>
  );
}

export default function CryResultScreen({ route, navigation }: Props): ReactElement {
  const { probabilities } = route.params;
  let recommended: { title: string; route: { name: 'SoothingGuide'; params?: { reason: 'hunger' | 'gas' | 'fatigue' } } } = { title: 'Sakinleştirme Rehberi', route: { name: 'SoothingGuide' } };
  const maxKey = (Object.entries(probabilities).sort((a, b) => b[1] - a[1])[0][0] as 'hunger' | 'gas' | 'fatigue');
  if (maxKey) {
    recommended = { title: 'Önerilen yöntemlere git', route: { name: 'SoothingGuide', params: { reason: maxKey } } };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olası Nedenler</Text>
      <Percent label="Açlık" value={probabilities.hunger} />
      <Percent label="Gaz" value={probabilities.gas} />
      <Percent label="Yorgunluk" value={probabilities.fatigue} />

      <Pressable style={styles.cta} onPress={() => navigation.navigate(recommended.route.name, recommended.route.params)}>
        <Text style={styles.ctaText}>{recommended.title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 16, color: '#0f172a' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  label: { fontSize: 16, color: '#334155' },
  value: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  cta: { marginTop: 24, backgroundColor: '#6366f1', padding: 16, borderRadius: 16, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '700' },
});

