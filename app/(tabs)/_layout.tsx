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
          },
          headerTintColor: "#000",
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 10 }}
            >
              <Ionicons name="chevron-back" size={28} color="#141414" />
            </TouchableOpacity>
          ),
          headerBackground: () => (
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
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
      <Stack.Screen
        name="protectedPages/completeProfile"
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="protectedPages/allMessageScreen"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default MainLayout;
