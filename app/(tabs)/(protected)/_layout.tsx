import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import { StatusBar, TouchableOpacity, Button } from 'react-native';
import { Link } from 'expo-router';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 100,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="home" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
