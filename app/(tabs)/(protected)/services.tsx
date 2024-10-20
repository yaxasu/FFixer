import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import { clearToken } from "@/app/functions/storage";


export default function Services() {
  return (
    <View style={styles.container}>
        <Text>Testing</Text>
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
