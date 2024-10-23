import { Tabs, useRouter } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics'; // Import expo-haptics
import { TouchableOpacity } from 'react-native';

export default function TabsLayout() {
  // Function to handle haptic feedback on tab press
  const handleTabPress = (onPress:any) => (e:any) => {
    Haptics.selectionAsync(); // Trigger haptic feedback
    if (onPress) onPress(e); // Call the default onPress behavior if exists
  };

  const router = useRouter();

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
          paddingTop: 30,
          height: 100,
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 80,
          borderTopColor: "#eeeeee",
          borderTopWidth: 1.5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "FFixer",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/protectedPages/allMessageScreen')}
              style={{ marginRight: 15 }}
            >
              <Feather name="message-circle" size={26} color="#000" />
            </TouchableOpacity>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={handleTabPress(props.onPress)}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={28} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={handleTabPress(props.onPress)}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => (
            <Feather name="activity" size={28} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={handleTabPress(props.onPress)}
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
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={34} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={handleTabPress(props.onPress)}
            >
              {props.children}
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
