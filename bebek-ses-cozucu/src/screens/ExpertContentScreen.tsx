import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpertContentScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uzman Görüşleri</Text>
      <Text style={styles.p}>Pediatri, uyku ve beslenme uzmanlarından kısa makaleler burada yer alacak.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  p: { color: '#334155' },
});

