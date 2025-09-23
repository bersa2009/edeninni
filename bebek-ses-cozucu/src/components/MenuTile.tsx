import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuTileProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  onPress?: () => void;
};

export default function MenuTile({ icon, title, subtitle, backgroundColor = '#F3F4F6', onPress }: MenuTileProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, { backgroundColor }] }>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color="#334155" />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  textWrap: { flex: 1 },
  title: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#334155', marginTop: 2 },
});

