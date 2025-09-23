import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../lib/theme';
import { ErrorBoundary } from '../components';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <StatusBar style="dark" backgroundColor={theme.colors.background} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Bebek Ses Çözücü',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="analyze/index" 
          options={{ 
            title: 'Ağlama Analizi',
            presentation: 'card',
          }} 
        />
        <Stack.Screen 
          name="analyze/analyzing" 
          options={{ 
            title: 'Analiz Ediliyor',
            headerBackVisible: false,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen 
          name="analyze/result" 
          options={{ 
            title: 'Sonuç',
            headerBackVisible: false,
            gestureEnabled: false,
          }} 
        />
        <Stack.Screen 
          name="recommendations/index" 
          options={{ 
            title: 'Öneriler',
            presentation: 'card',
          }} 
        />
      </Stack>
    </ErrorBoundary>
  );
}