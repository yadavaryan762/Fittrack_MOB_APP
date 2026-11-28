import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ActivityProvider } from './src/context/ActivityContext';
import { WorkoutProvider } from './src/context/WorkoutContext';
import { ProfileProvider } from './src/context/ProfileContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <ActivityProvider>
          <WorkoutProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <AppNavigator />
            </NavigationContainer>
          </WorkoutProvider>
        </ActivityProvider>
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
