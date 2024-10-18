import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MainLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide the header globally
        contentStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background, // Set the background color based on theme
        },
      }}
    >
      {/* Main screen for your app */}
      <Stack.Screen name="index" />
      <Stack.Screen
        name="auth"
        options={({ navigation }) => ({
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#000",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 10 }} // Adjust the padding here
            >
              <Ionicons name="arrow-back" size={28} color="#141414" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack>
  );
}
