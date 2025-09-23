import { View, Text, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ResultRow } from '../../components/ResultRow';
import { AnalysisResult } from '../../types';
import { colors, spacing, typography, cardStyle } from '../../lib/theme';
import tr from '../../i18n/tr.json';

export default function ResultScreen() {
  const { result } = useLocalSearchParams<{ result: string }>();
  const router = useRouter();
  const data = JSON.parse(String(result)) as AnalysisResult;

  const mapTitle = (l: string) => (l === 'hunger' ? tr['label.hunger'] : l === 'gas' ? tr['label.gas'] : tr['label.fatigue']);
  const bg = (l: string) => (l === 'hunger' ? colors.hunger : l === 'gas' ? colors.gas : colors.fatigue);

  return (
    <View style={{ flex: 1, padding: spacing.lg, gap: spacing.md }}>
      <Text style={typography.h2}>{tr['result.title']}</Text>
      <View style={{ ...cardStyle, gap: spacing.sm }}>
        {data.items.map((i) => (
          <ResultRow key={i.label} title={mapTitle(i.label)} percent={i.percent} bg={bg(i.label)} />
        ))}
      </View>
      <Pressable
        onPress={() => {}}
        style={{ backgroundColor: '#F6B680', borderRadius: 16, paddingVertical: 12, alignItems: 'center' }}
        accessibilityRole="button"
        accessibilityLabel={tr['result.viewGuide']}
      >
        <Text style={typography.button}>{tr['result.viewGuide']}</Text>
      </Pressable>
      <Pressable
        onPress={() => router.replace('/analyze')}
        style={{ backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 12, alignItems: 'center' }}
        accessibilityRole="button"
        accessibilityLabel={tr['result.retry']}
      >
        <Text style={typography.button}>{tr['result.retry']}</Text>
      </Pressable>
    </View>
  );
}

