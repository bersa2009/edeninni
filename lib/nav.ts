import { router } from 'expo-router';

export const navigation = {
  goToAnalyze: () => router.push('/analyze'),
  goToAnalyzing: (audioPath: string) => 
    router.push({ 
      pathname: '/analyze/analyzing', 
      params: { path: audioPath } 
    }),
  goToResult: (result: string) => 
    router.replace({ 
      pathname: '/analyze/result', 
      params: { result } 
    }),
  goBack: () => router.back(),
  goHome: () => router.replace('/'),
  repeatAnalysis: () => router.replace('/analyze'),
};