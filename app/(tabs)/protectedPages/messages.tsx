import { Text, View, StyleSheet } from "react-native";
import Header from "@/components/Header";

export default function Messages() {
  return (
    <View style={styles.container}>
        <Header />
        <Text>Testing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    color: "#000",
  },
});
