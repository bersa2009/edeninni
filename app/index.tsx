import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, cardStyle } from '../lib/theme';
import tr from '../i18n/tr.json';

export default function Home() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, padding: spacing.lg, justifyContent: 'center', gap: spacing.lg }}>
      <Text style={typography.h1}>{tr['menu.title']}</Text>
      <View style={{ ...cardStyle, gap: spacing.md }}>
        <Text style={typography.body}>{tr['analyze.hint']}</Text>
        <Pressable
          onPress={() => router.push('/analyze')}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 16,
            paddingVertical: 14,
            alignItems: 'center'
          }}
          accessibilityRole="button"
          accessibilityLabel={tr['menu.start']}
        >
          <Text style={typography.button}>{tr['menu.start']}</Text>
        </Pressable>
      </View>
    </View>
  );
}

