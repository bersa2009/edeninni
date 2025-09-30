import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const faqs = [
  { q: 'Bebek neden hıçkırır?', a: 'Genelde diafragmanın olgunlaşmasıyla ilgilidir ve zararsızdır.' },
  { q: 'İshal ne zaman tehlikeli olur?', a: 'Ateş, halsizlik, kanlı dışkı varsa doktora başvurun.' },
  { q: 'Gaz sancısı nasıl anlaşılır?', a: 'Karın sertliği, bacakları karına çekme, huzursuzluk.' },
];

export default function FaqScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SSS & Eğitim</Text>
      {faqs.map((f, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.q}>{f.q}</Text>
          <Text style={styles.a}>{f.a}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  card: { backgroundColor: '#F3F4F6', borderRadius: 12, padding: 12, marginVertical: 6 },
  q: { fontWeight: '700', color: '#0f172a' },
  a: { color: '#334155', marginTop: 4 },
});

