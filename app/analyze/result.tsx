import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ResultRow } from '../../components/ResultRow';
import { Button } from '../../components/Button';
import { AnalysisResult, CryClass } from '../../types';
import { theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function ResultScreen() {
  const { result } = useLocalSearchParams<{ result: string }>();
  const router = useRouter();

  // Parse the analysis result
  let analysisData: AnalysisResult;
  try {
    analysisData = JSON.parse(result || '{}');
  } catch (error) {
    console.error('Failed to parse result:', error);
    // Fallback data
    analysisData = {
      ts: new Date().toISOString(),
      items: [
        { label: 'hunger', percent: 70 },
        { label: 'gas', percent: 20 },
        { label: 'fatigue', percent: 10 },
      ],
    };
  }

  // Helper functions for localization and styling
  const getCryTypeTitle = (label: CryClass): string => {
    switch (label) {
      case 'hunger':
        return t('cryTypes.hunger');
      case 'gas':
        return t('cryTypes.gas');
      case 'fatigue':
        return t('cryTypes.fatigue');
      default:
        return label;
    }
  };

  const getCryTypeBackground = (label: CryClass): string => {
    switch (label) {
      case 'hunger':
        return theme.colors.hunger;
      case 'gas':
        return theme.colors.gas;
      case 'fatigue':
        return theme.colors.fatigue;
      default:
        return theme.colors.surface;
    }
  };

  const handleViewRecommendations = () => {
    // TODO: Navigate to recommendations screen or show modal
    Alert.alert(
      'Öneriler',
      'Öneriler ekranı yakında eklenecek. Bu özellik bebeğinizin ihtiyacına göre özel öneriler sunacak.',
      [{ text: 'Tamam' }]
    );
  };

  const handleRepeatAnalysis = () => {
    router.replace('/analyze');
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  // Sort results by percentage (highest first)
  const sortedResults = [...analysisData.items].sort((a, b) => b.percent - a.percent);
  const topResult = sortedResults[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('result.title')}</Text>
        
        {/* Top result highlight */}
        <View style={styles.topResultContainer}>
          <Text style={styles.topResultLabel}>En Olası Sebep</Text>
          <Text style={styles.topResultTitle}>
            {getCryTypeTitle(topResult.label)}
          </Text>
          <Text style={styles.topResultPercent}>
            %{topResult.percent}
          </Text>
        </View>

        {/* All results */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Tüm Sonuçlar</Text>
          {sortedResults.map((item, index) => (
            <ResultRow
              key={`${item.label}-${index}`}
              title={getCryTypeTitle(item.label)}
              percent={item.percent}
              backgroundColor={getCryTypeBackground(item.label)}
            />
          ))}
        </View>

        {/* Analysis timestamp */}
        <Text style={styles.timestamp}>
          Analiz: {new Date(analysisData.ts).toLocaleString('tr-TR')}
        </Text>

        {/* Action buttons */}
        <View style={styles.actions}>
          <Button
            title={t('result.viewGuide')}
            onPress={handleViewRecommendations}
            style={styles.primaryButton}
          />
          <Button
            title={t('result.repeatAnalysis')}
            onPress={handleRepeatAnalysis}
            variant="secondary"
          />
          <Button
            title="Ana Menüye Dön"
            onPress={handleGoHome}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  title: {
    ...theme.typography.heading,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  topResultContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.sm,
    marginBottom: theme.spacing.md,
  },
  topResultLabel: {
    ...theme.typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  topResultTitle: {
    ...theme.typography.heading,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  topResultPercent: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  resultsContainer: {
    gap: theme.spacing.sm,
  },
  resultsTitle: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  timestamp: {
    ...theme.typography.caption,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  primaryButton: {
    marginBottom: theme.spacing.sm,
  },
});