import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

interface ResultRowProps {
  title: string;
  percent: number;
  backgroundColor: string;
}

const ResultRow = memo<ResultRowProps>(({ title, percent, backgroundColor }) => {
  return (
    <View 
      style={[styles.container, { backgroundColor }]}
      accessibilityLabel={t('accessibility.resultRow')}
      accessibilityValue={{ text: `${title} ${percent} yüzde` }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.percent}>{percent}%</Text>
    </View>
  );
});

ResultRow.displayName = 'ResultRow';

export { ResultRow };

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.xs,
    minHeight: 56, // Ensure good touch target size
  },
  title: {
    ...theme.typography.body,
    flex: 1,
  },
  percent: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
});