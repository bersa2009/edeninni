import { ActivityIndicator, View, Text } from 'react-native';

export function ProgressRing({ label = 'Ses analiz ediliyor…' }: { label?: string }) {
  return (
    <View style={{ alignItems: 'center', gap: 12 }} accessibilityLabel="Analiz ilerlemesi">
      <ActivityIndicator size="large" />
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </View>
  );
}

