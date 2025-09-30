/**
 * Bebek Ses Çözücü - Baby Sound Solver App
 * Main application component with navigation
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainMenuScreen from './src/screens/MainMenuScreen';
import CryingAnalysisScreen from './src/screens/CryingAnalysisScreen';
import CalmingGuideScreen from './src/screens/CalmingGuideScreen';
import AudioCalmersScreen from './src/screens/AudioCalmersScreen';
import DailyTrackerScreen from './src/screens/DailyTrackerScreen';
import BabyProfileScreen from './src/screens/BabyProfileScreen';
import ExpertOpinionsScreen from './src/screens/ExpertOpinionsScreen';
import AIFeedbackScreen from './src/screens/AIFeedbackScreen';
import FAQEducationScreen from './src/screens/FAQEducationScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import DailyTipScreen from './src/screens/DailyTipScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export type RootStackParamList = {
  MainMenu: undefined;
  CryingAnalysis: undefined;
  CalmingGuide: undefined;
  AudioCalmers: undefined;
  DailyTracker: undefined;
  BabyProfile: undefined;
  ExpertOpinions: undefined;
  AIFeedback: undefined;
  FAQEducation: undefined;
  Community: undefined;
  DailyTip: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8DC" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MainMenu"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFF8DC',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
            name="MainMenu"
            component={MainMenuScreen}
            options={{ title: 'Bebek Ses Çözücü' }}
          />
          <Stack.Screen
            name="CryingAnalysis"
            component={CryingAnalysisScreen}
            options={{ title: 'Ağlama Analizi' }}
          />
          <Stack.Screen
            name="CalmingGuide"
            component={CalmingGuideScreen}
            options={{ title: 'Sakinleştirme Rehberi' }}
          />
          <Stack.Screen
            name="AudioCalmers"
            component={AudioCalmersScreen}
            options={{ title: 'Sesli Sakinleştiriciler' }}
          />
          <Stack.Screen
            name="DailyTracker"
            component={DailyTrackerScreen}
            options={{ title: 'Günlük Takipçi' }}
          />
          <Stack.Screen
            name="BabyProfile"
            component={BabyProfileScreen}
            options={{ title: 'Bebek Profili' }}
          />
          <Stack.Screen
            name="ExpertOpinions"
            component={ExpertOpinionsScreen}
            options={{ title: 'Uzman Görüşleri' }}
          />
          <Stack.Screen
            name="AIFeedback"
            component={AIFeedbackScreen}
            options={{ title: 'AI Geri Bildirim' }}
          />
          <Stack.Screen
            name="FAQEducation"
            component={FAQEducationScreen}
            options={{ title: 'SSS & Eğitim' }}
          />
          <Stack.Screen
            name="Community"
            component={CommunityScreen}
            options={{ title: 'Topluluk' }}
          />
          <Stack.Screen
            name="DailyTip"
            component={DailyTipScreen}
            options={{ title: 'Günün İpucu' }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Ayarlar' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
