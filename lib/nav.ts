import { useRouter } from 'expo-router';

export function useNav() {
  const router = useRouter();
  return {
    goHome: () => router.replace('/'),
    toAnalyze: () => router.push('/analyze'),
    toAnalyzing: (path: string) => router.push({ pathname: '/analyze/analyzing', params: { path } }),
    toResult: (result: object) => router.replace({ pathname: '/analyze/result', params: { result: JSON.stringify(result) } }),
    back: () => router.back(),
    replaceAnalyze: () => router.replace('/analyze')
  };
}

