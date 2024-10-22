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
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  checkEmail,
  registerUser,
  loginUser,
  getUserInfo,
} from "../api/user";
import { setToken, setProfileData, getProfileData } from "../api/storage";
import { useRouter } from "expo-router";
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

  // Animated values for shake animations
  const emailShakeAnim = useRef(new Animated.Value(0)).current;
  const isEmailAnimatingRef = useRef(false);
  const passwordShakeAnim = useRef(new Animated.Value(0)).current;
  const isPasswordAnimatingRef = useRef(false);

  useEffect(() => {
    const handleKeyboardShow = () => {
      if (!keyboardVisible) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setKeyboardVisible(true);
      }
    };

    const handleKeyboardHide = () => {
      if (keyboardVisible) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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

  const triggerEmailShake = () => {
    if (!isEmailAnimatingRef.current) {
      isEmailAnimatingRef.current = true;
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
        isEmailAnimatingRef.current = false;
      });
    }
  };

  const triggerPasswordShake = () => {
    if (!isPasswordAnimatingRef.current) {
      isPasswordAnimatingRef.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
        isPasswordAnimatingRef.current = false;
      });
    }
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
    setLoading(true);

    const handleProfileDataFetch = async (token: string) => {
      try {
        const profileData = await getUserInfo(token);
        if (profileData) {
          setProfileData(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const handleLogin = async () => {
      try {
        const result = await loginUser(emailOrPhone, password);
        setInvalidPassword(false);

        if (result.access_token) {
          await setToken(result.access_token);
          await handleProfileDataFetch(result.access_token);
          const profile = getProfileData();
          if (profile.first_name == "None") {
            router.push("/(tabs)/protectedPages/completeProfile");
          } else {
            router.push("/home");
          }
        }
      } catch (error: unknown) {
        handleLoginError(error);
      }
    };

    const handleSignUp = async () => {
      try {
        const result = await registerUser(emailOrPhone, password);
        setInvalidPassword(false);
        await handleLogin();
      } catch (error: unknown) {
        handleLoginError(error);
      }
    };

    try {
      if (isExistingUser) {
        await handleLogin();
      } else if (signUp) {
        await handleSignUp();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        setInvalidPassword(true);
        triggerPasswordShake();
      }
    } else {
      console.error("Unknown error occurred:", error);
    }
  };

  const refreshPage = () => {
    setEmailOrPhone("");
    setPassword("");
    setIsExistingUser(null);
    setSignUp(false);
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

          {/* Email Input with Spinner */}
          <Animated.View
            style={[
              styles.emailContainer,
              invalidEmail && { borderColor: "red", borderWidth: 2 },
              isExistingUser !== null && { backgroundColor: "#f0f0f0" },
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
              editable={isExistingUser === null && !loading}
              selectionColor="#141414"
            />
            {loading && isExistingUser === null ? (
              <ActivityIndicator size="small" color="#000" />
            ) : isExistingUser !== null ? (
              <TouchableOpacity onPress={refreshPage}>
                <Ionicons
                  name="close"
                  size={20}
                  color="#141414"
                  style={styles.checkmark}
                />
              </TouchableOpacity>
            ) : null}
          </Animated.View>

          {/* Password Input */}
          {(isExistingUser !== null || signUp) && (
            <Animated.View
              style={[
                styles.passwordContainer,
                invalidPassword && { borderColor: "red", borderWidth: 2 },
                { transform: [{ translateX: passwordShakeAnim }] },
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
                editable={!loading}
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

          {/* Remove duplicate spinner */}
          {/* Animated Button with Spinner */}
          <Animated.View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={
                isExistingUser === null ? checkEmailExists : handleLoginOrSignUp
              }
              disabled={loading}
            >
              {loading && isExistingUser !== null ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>
                  {isExistingUser === null
                    ? "Next"
                    : isExistingUser
                    ? "Sign In"
                    : "Sign Up"}
                </Text>
              )}
            </TouchableOpacity>
          </Animated.View>

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
    marginBottom: 15,
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
