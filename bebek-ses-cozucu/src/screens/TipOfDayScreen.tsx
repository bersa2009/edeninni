import React, { useEffect, useState, type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const tips = [
  'Bebeğinizin ilk gülümsemesi genelde 6. haftada olur 🌸',
  'Her gün kısa karın üstü zamanı (tummy time) kasları güçlendirir.',
  'Beyaz gürültü bazı bebeklerde sakinleştirici olabilir.',
];

export default function TipOfDayScreen(): ReactElement {
  const [tip, setTip] = useState<string>('');
  useEffect(() => {
    const idx = new Date().getDate() % tips.length;
    setTip(tips[idx]);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Günün İpucu</Text>
      <Text style={styles.tip}>{tip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  tip: { backgroundColor: '#FEF3C7', borderRadius: 12, padding: 12, color: '#92400e' },
});

