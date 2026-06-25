// Powered by OnSpace.AI
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AlertProvider } from '@/template';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProgressProvider } from '@/contexts/ProgressContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <ProgressProvider>
              <StatusBar style="auto" />
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F4F6FB' } }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="course/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="lesson" options={{ headerShown: false }} />
                <Stack.Screen name="quiz" options={{ headerShown: false }} />
              </Stack>
            </ProgressProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
