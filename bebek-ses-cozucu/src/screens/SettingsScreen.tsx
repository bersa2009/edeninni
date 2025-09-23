import React, { useState, type ReactElement } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen(): ReactElement {
  const [dark, setDark] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayarlar</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Karanlık Mod</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Bildirimler</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  label: { color: '#0f172a', fontWeight: '600' },
});

