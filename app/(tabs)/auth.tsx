import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StatusBar, // Import StatusBar
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { checkEmail, registerUser } from "../functions/api";

export default function Auth() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isExistingUser, setIsExistingUser] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const checkEmailExists = async () => {
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
      // Handle sign-in flow
      console.log("Sign in with:", emailOrPhone, password);
    } else if (signUp) {
      // Handle sign-up flow
      console.log("Sign up with:", emailOrPhone, password);
      const result = await registerUser(emailOrPhone, password);
      console.log(result);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Uber-like logo area */}
        <View style={styles.logoContainer}>
          <FontAwesome5 name="home" size={75} color="#141414" />
        </View>

        {/* Input for email */}
        <View style={styles.emailContainer}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
              placeholderTextColor="#A9A9A9"
              autoCapitalize="none"
              editable={isExistingUser === null}
              selectionColor="#141414"
            />
          </TouchableOpacity>
          {isExistingUser !== null && (
            <FontAwesome5
              name="check-circle"
              size={24}
              color="green"
              style={styles.checkmark}
            />
          )}
        </View>

        {/* Password input */}
        {(isExistingUser !== null || signUp) && (
          <View style={styles.passwordContainer}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => {}}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#A9A9A9"
                selectionColor="#141414"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.showPasswordButton}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Show a loader while checking email */}
        {loading && <ActivityIndicator size="large" color="#000" />}

        {/* Login/Sign-Up button */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align contents to the top
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 130 : 150, // Add some padding to avoid overlap with the StatusBar
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
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
