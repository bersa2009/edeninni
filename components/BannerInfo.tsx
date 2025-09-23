import { View, Text } from 'react-native';
import { colors } from '../lib/theme';

export function BannerInfo({ text }: { text: string }) {
  return (
    <View style={{ backgroundColor: colors.banner, borderRadius: 16, padding: 12 }}>
      <Text style={{ fontSize: 14 }}>{text}</Text>
    </View>
  );
}

