import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SoothingGuide'>;

const guides: Record<'hunger' | 'gas' | 'fatigue', string[]> = {
  hunger: [
    'Emzirme veya biberon: Önce sakin ortam sağlayın',
    'Doyma işaretlerine dikkat edin',
  ],
  gas: [
    'Bisiklet hareketi: Bacakları yavaşça çevirin',
    'Karın masajı: Saat yönünde dairesel hareket',
  ],
  fatigue: [
    'Kundaklama: Güvenli şekilde sarın',
    'Beyaz gürültü ve loş ortam',
  ],
};

export default function SoothingGuideScreen({ route }: Props): ReactElement {
  const reason = route.params?.reason ?? 'hunger';
  const items = guides[reason as 'hunger' | 'gas' | 'fatigue'];
  const title =
    reason === 'hunger' ? 'Açlık için öneriler' : reason === 'gas' ? 'Gaz için öneriler' : 'Yorgunluk için öneriler';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {items.map((line: string, idx: number) => (
        <Text key={idx} style={styles.item}>• {line}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  item: { fontSize: 16, color: '#334155', marginVertical: 6 },
});

