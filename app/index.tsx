import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components';
import { theme } from '../lib/theme';
import { t } from '../lib/i18n';

export default function Home() {
  const router = useRouter();

  const handleStartAnalysis = () => {
    router.push('/analyze');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('menu.title')}</Text>
          <Text style={styles.subtitle}>
            Bebeğinizin ağlama seslerini analiz ederek ihtiyaçlarını anlayın
          </Text>
        </View>

        <View style={styles.illustration}>
          <Text style={styles.emoji}>👶</Text>
          <Text style={styles.illustrationText}>
            Yapay zeka destekli analiz ile bebeğinizin ne istediğini öğrenin
          </Text>
        </View>

        <View style={styles.actions}>
          <Button
            title={t('menu.startAnalysis')}
            onPress={handleStartAnalysis}
            style={styles.primaryButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: theme.spacing.xxxl,
  },
  title: {
    ...theme.typography.title,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  illustration: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
  },
  emoji: {
    fontSize: 80,
    marginBottom: theme.spacing.lg,
  },
  illustrationText: {
    ...theme.typography.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    maxWidth: 280,
    lineHeight: 22,
  },
  actions: {
    gap: theme.spacing.md,
  },
  primaryButton: {
    marginBottom: theme.spacing.xl,
  },
});