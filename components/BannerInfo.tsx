import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../lib/theme';

interface BannerInfoProps {
  text: string;
  type?: 'info' | 'warning';
}

export function BannerInfo({ text, type = 'info' }: BannerInfoProps) {
  const backgroundColor = type === 'warning' ? theme.colors.warning : theme.colors.surface;
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  text: {
    ...theme.typography.caption,
    textAlign: 'center',
    lineHeight: 20,
  },
});