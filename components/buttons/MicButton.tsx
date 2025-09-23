import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

interface MicButtonProps {
  recording: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export function MicButton({ recording, onPress, disabled = false }: MicButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: recording ? theme.colors.recording : theme.colors.idle,
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
        },
      ]}
      accessibilityLabel={t('accessibility.micButton')}
      accessibilityHint={recording ? t('accessibility.recordingActive') : t('accessibility.recordingInactive')}
      accessibilityRole="button"
    >
      <Text style={styles.icon}>
        {recording ? '⏹️' : '🎙️'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  icon: {
    fontSize: 32,
    color: theme.colors.surface,
  },
});