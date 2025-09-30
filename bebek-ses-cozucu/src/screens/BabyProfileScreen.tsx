import React, { useEffect, useState, type ReactElement } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Profile = { name?: string; ageMonths?: string; height?: string; weight?: string; gender?: 'E' | 'K' };

export default function BabyProfileScreen(): ReactElement {
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('baby_profile');
      if (data) setProfile(JSON.parse(data));
    })();
  }, []);

  async function save(): Promise<void> {
    await AsyncStorage.setItem('baby_profile', JSON.stringify(profile));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bebek Profili</Text>
      <TextInput placeholder="İsim" style={styles.input} value={profile.name ?? ''} onChangeText={t => setProfile(p => ({ ...p, name: t }))} />
      <TextInput placeholder="Yaş (Ay)" keyboardType="numeric" style={styles.input} value={profile.ageMonths ?? ''} onChangeText={t => setProfile(p => ({ ...p, ageMonths: t }))} />
      <TextInput placeholder="Boy (cm)" keyboardType="numeric" style={styles.input} value={profile.height ?? ''} onChangeText={t => setProfile(p => ({ ...p, height: t }))} />
      <TextInput placeholder="Kilo (kg)" keyboardType="numeric" style={styles.input} value={profile.weight ?? ''} onChangeText={t => setProfile(p => ({ ...p, weight: t }))} />
      <Pressable style={styles.save} onPress={save}><Text style={styles.saveText}>Kaydet</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12, color: '#0f172a' },
  input: { backgroundColor: '#F3F4F6', borderRadius: 12, padding: 12, marginVertical: 6 },
  save: { backgroundColor: '#10b981', padding: 14, borderRadius: 12, marginTop: 10, alignItems: 'center' },
  saveText: { color: '#fff', fontWeight: '700' },
});

