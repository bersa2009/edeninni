import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ProgressRing } from '../../components';
import { analyze } from '../../ai/AiService';
import { theme } from '../../lib/theme';
import { t } from '../../lib/i18n';
import { logError } from '../../lib/logger';

export default function Analyzing() {
  const { path } = useLocalSearchParams<{ path: string }>();
  const router = useRouter();

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        if (!path) {
          logError('No audio path provided for analysis', 'AnalyzingScreen');
          router.replace('/analyze');
          return;
        }
        
        // Perform the AI analysis
        const result = await analyze(path);
        
        // Navigate to results screen
        router.replace({
          pathname: '/analyze/result',
          params: { result: JSON.stringify(result) }
        });
        
      } catch (error) {
        logError('Audio analysis failed', 'AnalyzingScreen', error);
        
        // On error, go back to recording screen
        router.replace('/analyze');
      }
    };

    // Start analysis after a brief delay to show the loading screen
    const timer = setTimeout(performAnalysis, 500);
    
    return () => clearTimeout(timer);
  }, [path, router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ProgressRing label={t('processing')} />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
});