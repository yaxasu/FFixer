import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
  Animated,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { checkEmail, registerUser } from "../functions/api";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Auth() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current; // Animated value for shake effect
  let isAnimating = false; // Flag to prevent overlapping animations

  // Function to trigger shake animation
  const triggerShake = () => {
    if (!isAnimating) {
      isAnimating = true;
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 6, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -6, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 4, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -4, duration: 75, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 75, useNativeDriver: true }),
      ]).start(() => {
        isAnimating = false; // Reset flag when animation is complete
      });
    }
  };

  useEffect(() => {
    const handleKeyboardShow = () => {
      if (!keyboardVisible) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Trigger layout animation
        setKeyboardVisible(true);
      }
    };

    const handleKeyboardHide = () => {
      if (keyboardVisible) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Trigger layout animation
        setKeyboardVisible(false);
      }
    };

    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardVisible]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async () => {
    if (!validateEmail(emailOrPhone)) {
      setInvalidEmail(true);
      triggerShake(); // Trigger the shake animation for invalid email input
      return;
    }
    setInvalidEmail(false);
    setLoading(true);
    try {
      const emailResponse = await checkEmail(emailOrPhone);
      setIsExistingUser(emailResponse);
      setSignUp(!emailResponse);
    } catch (error) {
      console.error("Error checking email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginOrSignUp = async () => {
    if (isExistingUser) {
      setLoading(true);
      console.log("Sign in with:", emailOrPhone, password);
      setLoading(false);
    } else if (signUp) {
      setLoading(true);
      console.log("Sign up with:", emailOrPhone, password);
      const result = await registerUser(emailOrPhone, password);
      console.log(result);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.innerContainer,
            {
              paddingTop: keyboardVisible
                ? 120
                : StatusBar.currentHeight
                ? StatusBar.currentHeight + 170
                : 190,
            },
          ]}
        >
          {/* Logo area */}
          <View style={[styles.logoContainer, keyboardVisible && styles.logoContainerSmall]}>
            <FontAwesome name="sign-in" size={75} color="#141414" />
          </View>

          {/* Input for email */}
          <Animated.View
            style={[
              styles.emailContainer,
              invalidEmail && { borderColor: "red", borderWidth: 2 },
              { transform: [{ translateX: shakeAnim }] }, // Apply shaking effect
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={emailOrPhone}
              onChangeText={(text) => setEmailOrPhone(text)}
              keyboardType="email-address"
              placeholderTextColor="#A9A9A9"
              autoCapitalize="none"
              editable={isExistingUser === null}
              selectionColor="#141414"
            />
            {isExistingUser !== null && (
              <FontAwesome5 name="check-circle" size={24} color="green" style={styles.checkmark} />
            )}
          </Animated.View>

          {/* Password input */}
          {(isExistingUser !== null || signUp) && (
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#A9A9A9"
                selectionColor="#141414"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.showPasswordButton}
              >
                <Text style={styles.showPasswordText}>{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          )}

          {loading && <ActivityIndicator size="large" color="#000" />}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={isExistingUser === null ? checkEmailExists : handleLoginOrSignUp}
          >
            <Text style={styles.loginButtonText}>
              {isExistingUser === null ? "Next" : isExistingUser ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          {/* Terms and conditions */}
          <View style={styles.footerTextContainer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{" "}
              <Text style={styles.linkText}>Terms of Service</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainerSmall: {
    marginBottom: 20,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  checkmark: {
    marginLeft: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
  },
  passwordInput: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  showPasswordButton: {
    padding: 10,
  },
  showPasswordText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "helvetica",
  },
  loginButton: {
    backgroundColor: "#141414",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "helvetica",
  },
  footerTextContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#A9A9A9",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "helvetica",
  },
  linkText: {
    color: "#141414",
    fontFamily: "helvetica-bold",
  },
});
