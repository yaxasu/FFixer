import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StatusBar } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding until the fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load custom fonts
  const [fontsLoaded] = useFonts({
    helvetica: require('../assets/fonts/helvetica/Helvetica-01.ttf'),
    helvetica_bold: require('../assets/fonts/helvetica/Helvetica-Bold-02.ttf'),
    helvetica_bold_oblique: require('../assets/fonts/helvetica/Helvetica-BoldOblique-04.ttf'),
    helvetica_light: require('../assets/fonts/helvetica/Helvetica-Light-05.ttf'),
    helvetica_light_oblique: require('../assets/fonts/helvetica/Helvetica-LightOblique-06.ttf'),
    helvetica_oblique: require('../assets/fonts/helvetica/Helvetica-Oblique-03.ttf'),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Set the status bar style based on the color scheme
  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, [colorScheme]);

  // Return null if fonts are not loaded yet
  if (!fontsLoaded) {
    return null;
  }

  // Render the app layout with appropriate theme
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
