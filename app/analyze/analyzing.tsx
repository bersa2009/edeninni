import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ProgressRing } from '../../components/ProgressRing';
import { analyze } from '../../ai/AiService';
import { theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

export default function Analyzing() {
  const { path } = useLocalSearchParams<{ path: string }>();
  const router = useRouter();

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        if (!path) {
          console.error('No audio path provided');
          router.replace('/analyze');
          return;
        }

        console.log('Starting analysis for path:', path);
        
        // Perform the AI analysis
        const result = await analyze(path);
        
        console.log('Analysis completed:', result);
        
        // Navigate to results screen
        router.replace({
          pathname: '/analyze/result',
          params: { result: JSON.stringify(result) }
        });
        
      } catch (error) {
        console.error('Analysis failed:', error);
        
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