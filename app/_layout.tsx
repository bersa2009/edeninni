import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#FFF6E9' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="analyze/index" />
        <Stack.Screen name="analyze/analyzing" />
        <Stack.Screen name="analyze/result" />
      </Stack>
    </SafeAreaProvider>
  );
}

