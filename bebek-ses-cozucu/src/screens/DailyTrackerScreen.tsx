import React, { useEffect, useState, type ReactElement } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Entry = { id: string; type: 'feed' | 'sleep' | 'diaper'; time: number };

export default function DailyTrackerScreen(): ReactElement {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('entries');
      if (data) setEntries(JSON.parse(data));
    })();
  }, []);

  async function add(type: Entry['type']): Promise<void> {
    const next = [{ id: String(Date.now()), type, time: Date.now() }, ...entries];
    setEntries(next);
    await AsyncStorage.setItem('entries', JSON.stringify(next));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Günlük Takipçi</Text>
      <View style={styles.row}>
        <Pressable style={styles.btn} onPress={() => add('feed')}><Text style={styles.btnText}>Emzirme</Text></Pressable>
        <Pressable style={styles.btn} onPress={() => add('sleep')}><Text style={styles.btnText}>Uyku</Text></Pressable>
        <Pressable style={styles.btn} onPress={() => add('diaper')}><Text style={styles.btnText}>Bez</Text></Pressable>
      </View>
      <FlatList
        data={entries}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={styles.listRow}>
            <Text style={{ color: '#0f172a' }}>{item.type}</Text>
            <Text style={{ color: '#334155' }}>{new Date(item.time).toLocaleTimeString()}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  row: { flexDirection: 'row', gap: 8 },
  btn: { backgroundColor: '#6366f1', padding: 10, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700' },
  listRow: { backgroundColor: '#F3F4F6', padding: 12, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between' },
});

