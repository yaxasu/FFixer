import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useRouter } from 'expo-router';


const MainLayout = () => {
  const router = useRouter()
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={({ navigation }) => ({
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
      <Stack.Screen
        name="protectedPages/editProfile"
        options={({ navigation }) => ({
          headerShown: true,
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="close" size={28} color="#141414" />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderBottomWidth: 0,
                borderBottomColor: "#000",
              }}
            />
          ),
          title: "",
          contentStyle: {
            backgroundColor: "#fff",
          },
        })}
      />
      <Stack.Screen
        name="protectedPages/payment"
        options={{
          headerShown: true,
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          headerLeft: ({ navigation }: any) => (
            <TouchableOpacity
            onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="close" size={28} color="#141414" />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderBottomWidth: 0,
                borderBottomColor: "#000",
              }}
            />
          ),
          title: "",
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="protectedPages/settings"
        options={{
          headerShown: true,
          gestureDirection: "vertical",
          animation: "slide_from_bottom",
          headerLeft: ({ navigation }: any) => (
            <TouchableOpacity
            onPress={() => router.back()}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="close" size={28} color="#141414" />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderBottomWidth: 0,
                borderBottomColor: "#000",
              }}
            />
          ),
          title: "",
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
    </Stack>
  );
};

export default MainLayout;
