// CompleteProfile.tsx

import React, { useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { getToken } from '@/app/functions/storage';
import { completeProfile } from '@/app/functions/api';
import InputField from '@/components/InputField';
import { getUserInfo } from '@/app/functions/api';
import { setProfileData } from '@/app/functions/storage';
import { useNavigation } from '@react-navigation/native';
import { clearProfileData, clearToken } from '@/app/functions/storage';

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
  locationGranted?: string;
}

interface ProfileData {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  citizenship: string;
  locationGranted: boolean;
  latitude?: number;
  longitude?: number;
}

export default function CompleteProfile() {
  const navigation = useNavigation();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    citizenship: '',
    locationGranted: false,
    latitude: undefined,
    longitude: undefined,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Loading states
  const [locationLoading, setLocationLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Animated value and flag for submit button shake
  const submitButtonShakeAnim = useRef(new Animated.Value(0)).current;
  const isButtonAnimatingRef = useRef(false);

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formattedValue = '';

    if (digits.length <= 4) {
      formattedValue = digits;
    } else if (digits.length <= 6) {
      formattedValue = digits.slice(0, 4) + '-' + digits.slice(4);
    } else {
      formattedValue =
        digits.slice(0, 4) + '-' + digits.slice(4, 6) + '-' + digits.slice(6, 8);
    }
    return formattedValue;
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    let formattedValue = '';

    if (digits.length <= 3) {
      formattedValue = digits;
    } else if (digits.length <= 6) {
      formattedValue = '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
    } else {
      formattedValue =
        '(' +
        digits.slice(0, 3) +
        ') ' +
        digits.slice(3, 6) +
        '-' +
        digits.slice(6, 10);
    }
    return formattedValue;
  };

  const handleInputChange = (
    name: keyof Omit<FormData, 'locationGranted' | 'latitude' | 'longitude'>,
    value: string
  ) => {
    let formattedValue = value;

    if (name === 'dateOfBirth') {
      formattedValue = formatDate(value);
    } else if (name === 'phoneNumber') {
      formattedValue = formatPhoneNumber(value);
    }

    setFormData((prevState) => ({ ...prevState, [name]: formattedValue }));
  };

  // Add this helper function
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return false;
    }

    const [year, month, day] = dateString.split('-').map(Number);

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() + 1 === month &&
      date.getUTCDate() === day
    );
  };

  const validateForm = () => {
    let valid = true;
    let errors: FormErrors = {};

    if (formData.phoneNumber.replace(/\D/g, '').length !== 10) {
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
    } else if (!isValidDate(formData.dateOfBirth)) {
      errors.dateOfBirth = 'Please enter a valid date.';
      valid = false;
    } else if (new Date(formData.dateOfBirth) > new Date()) {
      errors.dateOfBirth = 'Date of birth cannot be in the future.';
      valid = false;
    }
    if (!formData.citizenship) {
      errors.citizenship = 'Country of residence is required.';
      valid = false;
    }
    if (!formData.locationGranted) {
      errors.locationGranted = 'Location access is required.';
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
    setLocationLoading(true);
    try {
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
        setFormData((prevState) => ({
          ...prevState,
          locationGranted: false,
        }));
        alert('Location permission denied.');
      }
    } catch (error) {
      console.error('Error accessing location:', error);
      setFormData((prevState) => ({
        ...prevState,
        locationGranted: false,
      }));
      alert('An error occurred while accessing location.');
    } finally {
      setLocationLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setFormSubmitting(true);
      try {
        const token = getToken();
        if (!token) {
          alert('Authentication token not found. Please log in again.');
          router.replace('/auth');
          return;
        }

        // Prepare the profile data
        const profileData: ProfileData = {
          phoneNumber: formData.phoneNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
          dateOfBirth: formData.dateOfBirth,
          citizenship: formData.citizenship,
          locationGranted: formData.locationGranted,
          latitude: formData.latitude,
          longitude: formData.longitude,
        };

        const response = await completeProfile(token, profileData);

        if (response.success) {
          try {
            const profileData = await getUserInfo(token);
            if (profileData) {
              setProfileData(profileData);
            }
            router.push('/home');
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        } else {
          alert('Error updating profile: ' + response.message);
          router.push('/auth');
        }
      } catch (error: any) {
        console.error('Error submitting form:', error);
        const errorMessage =
          error.response?.data?.message ||
          'An error occurred while submitting the form.';
        alert(errorMessage);
      } finally {
        setFormSubmitting(false);
      }
    } else {
      triggerButtonShake();
    }
  };

  // Configuration array for input fields
  const inputFields = [
    {
      name: 'phoneNumber' as const,
      placeholder: 'Phone Number',
      keyboardType: 'phone-pad' as const,
      formatter: formatPhoneNumber,
    },
    {
      name: 'firstName' as const,
      placeholder: 'First Name',
    },
    {
      name: 'lastName' as const,
      placeholder: 'Last Name',
    },
    {
      name: 'dateOfBirth' as const,
      placeholder: 'Date of Birth (YYYY-MM-DD)',
      keyboardType: 'phone-pad' as const,
      formatter: formatDate,
    },
    {
      name: 'citizenship' as const,
      placeholder: 'Country',
    },
  ];

  function handleLogout() {
    clearToken();
    clearProfileData();
    navigation.navigate('index' as unknown as never);
  }

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

          {inputFields.map((field) => (
            <InputField
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              keyboardType={field.keyboardType}
              value={formData[field.name]}
              onChangeText={(value) =>
                handleInputChange(
                  field.name,
                  field.formatter ? field.formatter(value) : value
                )
              }
              error={errors[field.name]}
            />
          ))}

          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleLocationAccess}
            disabled={locationLoading}
          >
            {locationLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.locationButtonText}>
                {formData.locationGranted
                  ? 'Location Access Granted'
                  : 'Allow Location Access'}
              </Text>
            )}
          </TouchableOpacity>
          {errors.locationGranted && (
            <Text style={styles.errorText}>{errors.locationGranted}</Text>
          )}

          {formSubmitting && (
            <ActivityIndicator size="large" color="#000" style={styles.spinner} />
          )}

          <Animated.View
            style={{ transform: [{ translateX: submitButtonShakeAnim }] }}
          >
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={formSubmitting}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleLogout}
          >
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
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
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
    fontFamily: 'helvetica',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
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
    fontFamily: 'helvetica',
  },
  signOutButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signOutText: {
    color: '#ff3b30',
    fontSize: 14,
    fontFamily: 'helvetica',
  },
  spinner: {
    marginVertical: 15,
  },
});
