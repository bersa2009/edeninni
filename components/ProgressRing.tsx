import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { theme } from '../lib/theme';
import { t } from '../lib/i18n';

interface ProgressRingProps {
  label?: string;
}

export function ProgressRing({ label = t('processing') }: ProgressRingProps) {
  return (
    <View style={styles.container} accessibilityLabel={t('accessibility.analysisProgress')}>
      <ActivityIndicator 
        size="large" 
        color={theme.colors.primary}
        style={styles.indicator}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },
  indicator: {
    transform: [{ scale: 1.5 }],
  },
  label: {
    ...theme.typography.body,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});