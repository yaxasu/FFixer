import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const MainLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[colorScheme ?? "dark"].background,
        }
      }}
    >
      <Stack.Screen name="index" 
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="auth"
        options={({ navigation }) => ({
          headerShown: true,
          title: "",
          headerStyle: {
            backgroundColor: "#fff",
            borderBottomWidth: 1, // Defines the width of the bottom border
            borderBottomColor: "#000", // Defines the color of the bottom border
          },
          headerTintColor: "#000",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="arrow-back" size={28} color="#141414" />
            </TouchableOpacity>
          ),
          headerBackground: () => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderBottomWidth: 5,
                  borderBottomColor: "#000",
                }}
              />
            ),
        })}
      />
      <Stack.Screen
        name="(protected)"
        options={{
          gestureEnabled: false,
        }} 
      />
    </Stack>
  );
};

export default MainLayout;
