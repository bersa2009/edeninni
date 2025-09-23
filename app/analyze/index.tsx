import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MicButton } from '../../components/MicButton';
import { BannerInfo } from '../../components/BannerInfo';
import { startRecording, stopRecording } from '../../ai/audio';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, cardStyle } from '../../lib/theme';
import tr from '../../i18n/tr.json';

export default function AnalyzeStart() {
  const [rec, setRec] = useState(false);
  const router = useRouter();

  async function toggleRec() {
    if (!rec) {
      await startRecording();
      setRec(true);
    } else {
      const path = await stopRecording();
      setRec(false);
      router.push({ pathname: '/analyze/analyzing', params: { path } });
    }
  }

  return (
    <View style={{ flex: 1, padding: spacing.lg, justifyContent: 'space-between' }}>
      <Text style={typography.h2}>{tr['analyze.title']}</Text>
      <View style={{ ...cardStyle, gap: spacing.md }}>
        <BannerInfo text={tr['analyze.hint']} />
        <View style={{ alignItems: 'center', gap: spacing.sm }}>
          <MicButton recording={rec} onPress={toggleRec} />
          <Text style={typography.body}>{rec ? tr['record.stop'] : tr['record.start']}</Text>
        </View>
      </View>

      <Pressable
        onPress={() => router.back()}
        style={{ backgroundColor: colors.primary, borderRadius: 16, paddingVertical: 12, alignItems: 'center' }}
        accessibilityRole="button"
        accessibilityLabel={tr['back.to.menu']}
      >
        <Text style={typography.button}>{tr['back.to.menu']}</Text>
      </Pressable>
    </View>
  );
}

