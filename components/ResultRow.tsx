import { View, Text } from 'react-native';

export function ResultRow({ title, percent, bg }: { title: string; percent: number; bg: string }) {
  return (
    <View
      style={{
        backgroundColor: bg,
        borderRadius: 14,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      accessibilityLabel={`Sonuç satırı ${title} yüzde ${percent}`}
    >
      <Text style={{ fontSize: 16 }}>{title}</Text>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>{percent}%</Text>
    </View>
  );
}

