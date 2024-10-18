import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const logoScale = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence for logo and button
    Animated.sequence([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [logoScale, buttonScale]);

  const handleGetStartedPress = () => {
    navigation.navigate("auth" as unknown as never);
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.logoText, { transform: [{ scale: logoScale }] }]}
      >
        FFixer
      </Animated.Text>

      <TouchableOpacity onPress={handleGetStartedPress} style={styles.buttonContainer}>
        <Animated.View
          style={[
            styles.getStartedButton,
            { transform: [{ scale: buttonScale }] },
          ]}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Set a clean background color
    padding: 20,
  },
  logoText: {
    fontSize: 48,
    fontFamily: "helvetica_bold",
    color: "#141414",
    marginBottom: 500,
  },
  buttonContainer: {
    width: "100%"
  },
  getStartedButton: {
    alignSelf: "center",
    width: "90%",
    height: 60,
    backgroundColor: "#141414",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  getStartedText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "helvetica",
  },
});
