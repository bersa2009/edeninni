import 'react-native-gesture-handler';
import React, { type ReactElement } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import './i18n/setup';
import HomeScreen from './screens/HomeScreen';
import CryAnalysisScreen from './screens/CryAnalysisScreen';
import CryResultScreen from './screens/CryResultScreen';
import SoothingGuideScreen from './screens/SoothingGuideScreen';
import AudioSoothersScreen from './screens/AudioSoothersScreen';
import DailyTrackerScreen from './screens/DailyTrackerScreen';
import BabyProfileScreen from './screens/BabyProfileScreen';
import ExpertContentScreen from './screens/ExpertContentScreen';
import FaqScreen from './screens/FaqScreen';
import CommunityScreen from './screens/CommunityScreen';
import TipOfDayScreen from './screens/TipOfDayScreen';
import SettingsScreen from './screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  CryAnalysis: undefined;
  CryResult: {
    probabilities: { hunger: number; gas: number; fatigue: number };
  };
  SoothingGuide: { reason?: 'hunger' | 'gas' | 'fatigue' } | undefined;
  AudioSoothers: undefined;
  DailyTracker: undefined;
  BabyProfile: undefined;
  ExpertContent: undefined;
  FAQ: undefined;
  Community: undefined;
  TipOfDay: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): ReactElement {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CryAnalysis" component={CryAnalysisScreen} options={{ title: '' }} />
          <Stack.Screen name="CryResult" component={CryResultScreen} options={{ title: '' }} />
          <Stack.Screen name="SoothingGuide" component={SoothingGuideScreen} />
          <Stack.Screen name="AudioSoothers" component={AudioSoothersScreen} />
          <Stack.Screen name="DailyTracker" component={DailyTrackerScreen} />
          <Stack.Screen name="BabyProfile" component={BabyProfileScreen} />
          <Stack.Screen name="ExpertContent" component={ExpertContentScreen} />
          <Stack.Screen name="FAQ" component={FaqScreen} options={{ title: 'SSS & Eğitim' }} />
          <Stack.Screen name="Community" component={CommunityScreen} options={{ title: 'Topluluk' }} />
          <Stack.Screen name="TipOfDay" component={TipOfDayScreen} options={{ title: 'Günün İpucu' }} />
          <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

