import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import { clearToken } from "@/app/functions/storage";


export default function Home() {

  return (
    <View style={styles.container}>
        <Text>Welcome to your home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
