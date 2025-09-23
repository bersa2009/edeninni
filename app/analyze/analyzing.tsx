import { useEffect } from 'react';
import { View } from 'react-native';
import { ProgressRing } from '../../components/ProgressRing';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { analyze } from '../../ai/AiService';
import tr from '../../i18n/tr.json';

export default function Analyzing() {
  const { path } = useLocalSearchParams<{ path: string }>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await analyze(String(path));
      router.replace({ pathname: '/analyze/result', params: { result: JSON.stringify(result) } });
    })();
  }, [path]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ProgressRing label={tr['processing']} />
    </View>
  );
}

