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
import axios, { AxiosError } from "axios";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  checkEmail,
  registerUser,
  loginUser,
  getUserInfo,
} from "../functions/api";
import { setToken, getToken, setProfileData } from "../functions/storage";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router";
import * as Haptics from "expo-haptics";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
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
  const [invalidPassword, setInvalidPassword] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  // Function to trigger email shake animation
  const emailShakeAnim = useRef(new Animated.Value(0)).current;
  const isEmailAnimatingRef = useRef(false); // Ref to preserve state between renders
  const triggerEmailShake = () => {
    if (!isEmailAnimatingRef.current) {
      isEmailAnimatingRef.current = true; // Use the ref instead of a regular variable
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Animated.sequence([
        Animated.timing(emailShakeAnim, {
          toValue: 8,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(emailShakeAnim, {
          toValue: -8,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(emailShakeAnim, {
          toValue: 6,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(emailShakeAnim, {
          toValue: -6,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(emailShakeAnim, {
          toValue: 4,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(emailShakeAnim, {
          toValue: -4,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(emailShakeAnim, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isEmailAnimatingRef.current = false; // Reset flag after animation completes
      });
    }
  };

  // Function to trigger password shake animation
  const passwordShakeAnim = useRef(new Animated.Value(0)).current; // Animated value for password shake
  let isPasswordAnimating = false; // Prevent overlapping animations
  const triggerPasswordShake = () => {
    if (!isPasswordAnimating) {
      isPasswordAnimating = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // Haptic feedback
      Animated.sequence([
        Animated.timing(passwordShakeAnim, {
          toValue: 8,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(passwordShakeAnim, {
          toValue: -8,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(passwordShakeAnim, {
          toValue: 6,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(passwordShakeAnim, {
          toValue: -6,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(passwordShakeAnim, {
          toValue: 4,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(passwordShakeAnim, {
          toValue: -4,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(passwordShakeAnim, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isPasswordAnimating = false; // Reset flag when animation is complete
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

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

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
      triggerEmailShake();
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
    setLoading(true); // Start loading indicator

    const handleProfileDataFetch = async (token: string) => {
      try {
        const profileData = await getUserInfo(token);
        console.log("Profile Data:", profileData);
        if (profileData) {
          setProfileData(profileData);
        }
        navigation.navigate("(protected)" as unknown as never);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const handleLogin = async () => {
      try {
        const result = await loginUser(emailOrPhone, password);
        console.log(result);
        setInvalidPassword(false); // Clear invalid password state on success

        if (result.access_token) {
          await setToken(result.access_token);
          await handleProfileDataFetch(result.access_token);
        }
      } catch (error: unknown) {
        handleLoginError(error);
      }
    };

    const handleSignUp = async () => {
      try {
        const result = await registerUser(emailOrPhone, password);
        console.log(result);
        setInvalidPassword(false); // Clear invalid password state on successful sign-up

        // Auto-login after successful registration
        await handleLogin();
      } catch (error: unknown) {
        handleLoginError(error);
      }
    };

    try {
      if (isExistingUser) {
        console.log("Sign in with:", emailOrPhone, password);
        await handleLogin();
      } else if (signUp) {
        console.log("Sign up with:", emailOrPhone);
        await handleSignUp();
      }
    } finally {
      setLoading(false);
    }
  };

  // Separate error handler for login and sign-up errors
  const handleLoginError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        setInvalidPassword(true); // Set invalid password state
        triggerPasswordShake(); // Trigger shake animation for incorrect password
      }
    } else {
      console.error("Unknown error occurred:", error);
    }
  };

  const refreshPage = () => {
    setEmailOrPhone(""); // Clear the email input
    setPassword("");
    setIsExistingUser(null); // Reset the state
    setSignUp(false); // Reset the sign-up state
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
          <View
            style={[
              styles.logoContainer,
              keyboardVisible && styles.logoContainerSmall,
            ]}
          >
            <FontAwesome name="sign-in" size={75} color="#141414" />
          </View>

          {/* Input for email */}
          <Animated.View
            style={[
              styles.emailContainer,
              invalidEmail && { borderColor: "red", borderWidth: 2 },
              isExistingUser !== null && { backgroundColor: "#f0f0f0" }, // Darker background when email is entered
              { transform: [{ translateX: emailShakeAnim }] },
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
              <TouchableOpacity onPress={refreshPage}>
                <Ionicons
                  name="close"
                  size={20}
                  color="#141414"
                  style={styles.checkmark}
                />
              </TouchableOpacity>
            )}
          </Animated.View>

          {/* Password input */}
          {(isExistingUser !== null || signUp) && (
            <Animated.View
              style={[
                styles.passwordContainer,
                invalidPassword && { borderColor: "red", borderWidth: 2 },
                { transform: [{ translateX: passwordShakeAnim }] }, // Apply password shaking effect
              ]}
            >
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
                <Text style={styles.showPasswordText}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {loading && <ActivityIndicator size="large" color="#000" />}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={
              isExistingUser === null ? checkEmailExists : handleLoginOrSignUp
            }
          >
            <Text style={styles.loginButtonText}>
              {isExistingUser === null
                ? "Next"
                : isExistingUser
                ? "Sign In"
                : "Sign Up"}
            </Text>
          </TouchableOpacity>

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
    color: "#444",
    fontFamily: "helvetica-bold",
  },
});
