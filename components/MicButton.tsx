import { Pressable, Text, View } from 'react-native';
import { colors } from '../lib/theme';

export function MicButton({ recording, onPress }: { recording: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Mikrofon kaydını başlat veya durdur">
      <View
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: recording ? colors.danger : colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 12
        }}
      >
        <Text style={{ color: '#fff', fontSize: 40 }}>{recording ? '■' : '🎙️'}</Text>
      </View>
    </Pressable>
  );
}

