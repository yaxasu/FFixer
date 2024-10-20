import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics'; // Import expo-haptics
import { TouchableOpacity } from 'react-native'; // Import TouchableOpacity

export default function TabsLayout() {
  // Function to handle haptic feedback on tab press
  const handleTabPress = () => {
    Haptics.selectionAsync(); // Trigger haptic feedback
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#141414",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTintColor: "#000",
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 34,
          fontFamily: "helvetica_bold",
          color: "#141414",
          paddingTop: 40,
          height: 80
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 90,
          borderTopColor: "#eeeeee",
          borderTopWidth: 2,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "FFixer",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="home" size={30} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => {
                handleTabPress(); // Trigger haptic feedback
                if (props.onPress) props.onPress(e); // Call the default onPress behavior
              }}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="search" size={30} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => {
                handleTabPress(); // Trigger haptic feedback
                if (props.onPress) props.onPress(e); // Call the default onPress behavior
              }}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="message-circle" size={30} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => {
                handleTabPress(); // Trigger haptic feedback
                if (props.onPress) props.onPress(e); // Call the default onPress behavior
              }}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="account" size={36} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={(e) => {
                handleTabPress(); // Trigger haptic feedback
                if (props.onPress) props.onPress(e); // Call the default onPress behavior
              }}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
