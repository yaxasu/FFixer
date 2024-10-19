import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useNavigation } from "expo-router";
import { clearToken } from "@/app/functions/storage";


export default function Home() {
    const navigation = useNavigation()
    function handleLogout() {
        clearToken();
        navigation.navigate("index" as unknown as never)
      }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
