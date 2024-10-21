import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

interface FormData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  citizenship: string;
  locationGranted: boolean;
  latitude?: number;
  longitude?: number;
}

interface FormErrors {
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  citizenship?: string;
}

export default function CompleteProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    citizenship: '',
    locationGranted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Animated value and flag for submit button shake
  const submitButtonShakeAnim = useRef(new Animated.Value(0)).current;
  const isButtonAnimatingRef = useRef(false);

  const handleInputChange = (
    name: keyof Omit<FormData, 'locationGranted' | 'latitude' | 'longitude'>,
    value: string
  ) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    let errors: FormErrors = {};

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number.';
      valid = false;
    }
    if (!formData.firstName) {
      errors.firstName = 'First name is required.';
      valid = false;
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required.';
      valid = false;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
      errors.dateOfBirth = 'Please enter date in YYYY-MM-DD format.';
      valid = false;
    }
    if (!formData.citizenship) {
      errors.citizenship = 'Citizenship is required.';
      valid = false;
    }
    if (!formData.locationGranted) {
      // You can optionally handle location validation here
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const triggerButtonShake = () => {
    if (!isButtonAnimatingRef.current) {
      isButtonAnimatingRef.current = true;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Animated.sequence([
        Animated.timing(submitButtonShakeAnim, {
          toValue: 8,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(submitButtonShakeAnim, {
          toValue: -8,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(submitButtonShakeAnim, {
          toValue: 6,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(submitButtonShakeAnim, {
          toValue: -6,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(submitButtonShakeAnim, {
          toValue: 4,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(submitButtonShakeAnim, {
          toValue: -4,
          duration: 75,
          useNativeDriver: true,
        }),
        Animated.timing(submitButtonShakeAnim, {
          toValue: 0,
          duration: 75,
          useNativeDriver: true,
        }),
      ]).start(() => {
        isButtonAnimatingRef.current = false;
      });
    }
  };

  const handleLocationAccess = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      setFormData((prevState) => ({
        ...prevState,
        locationGranted: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
    } else {
      // Optional: Handle location permission denial
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Proceed with form submission
      alert('Your profile has been updated successfully.');
    } else {
      // Trigger haptic feedback and button shake animation
      triggerButtonShake();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Complete Your Profile</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your 10-digit phone number (e.g., 1234567890)"
              placeholderTextColor="#555555"
              keyboardType="phone-pad"
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              value={formData.phoneNumber}
            />
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name (e.g., John)"
              placeholderTextColor="#555555"
              onChangeText={(value) => handleInputChange('firstName', value)}
              value={formData.firstName}
            />
            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Last Name (e.g., Doe)"
              placeholderTextColor="#555555"
              onChangeText={(value) => handleInputChange('lastName', value)}
              value={formData.lastName}
            />
            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD, e.g., 1990-01-01)"
              placeholderTextColor="#555555"
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              value={formData.dateOfBirth}
            />
            {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Citizenship (e.g., United States)"
              placeholderTextColor="#555555"
              onChangeText={(value) => handleInputChange('citizenship', value)}
              value={formData.citizenship}
            />
            {errors.citizenship && <Text style={styles.errorText}>{errors.citizenship}</Text>}
          </View>

          <TouchableOpacity style={styles.locationButton} onPress={handleLocationAccess}>
            <Text style={styles.locationButtonText}>
              {formData.locationGranted ? 'Location Access Granted' : 'Allow Location Access'}
            </Text>
          </TouchableOpacity>

          {/* Wrap the submit button in Animated.View for shake animation */}
          <Animated.View style={{ transform: [{ translateX: submitButtonShakeAnim }] }}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity style={styles.signOutButton} onPress={() => router.back()}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 100,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
    paddingBottom: 40, // Add some padding at the bottom
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  signOutButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signOutText: {
    color: '#ff3b30',
    fontSize: 14,
  },
});
