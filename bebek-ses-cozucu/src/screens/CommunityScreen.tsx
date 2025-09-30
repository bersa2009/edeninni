import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CommunityScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topluluk</Text>
      <Text style={styles.p}>Anonim ebeveyn forumu için burada bir liste/konu akışı gösterilecek.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  p: { color: '#334155' },
});

