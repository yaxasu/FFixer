import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useRouter } from 'expo-router';

type IconOption = {
  title: string;
  icon: 'edit' | 'credit-card' | 'settings';
  onPress: () => void;
};

const ProfileOptions = () => {
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const navigation = useNavigation();
  const router = useRouter();

  const options: IconOption[] = [
    { title: 'Edit Profile', icon: 'edit', onPress: () => {router.push("/protectedPages/editProfile")} },
    { title: 'Payment', icon: 'credit-card', onPress: () => {router.push("/protectedPages/payment")} },
    { title: 'Settings', icon: 'settings', onPress: () => {router.push("/protectedPages/settings")} },
  ];
  

  const handlePressIn = (index: number) => {
    setPressedIndex(index);
  };

  const handlePressOut = () => {
    setPressedIndex(null);
  };

  return (
    <View style={styles.optionsContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            pressedIndex === index && styles.optionButtonPressed,
          ]}
          onPressIn={() => handlePressIn(index)}
          onPressOut={handlePressOut}
          onPress={option.onPress}
        >
          <View style={styles.optionContent}>
            <MaterialIcons name={option.icon} size={24} color="#6e6e6e" />
            <Text style={styles.optionText}>{option.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', // Default background
    borderRadius: 8,
    marginBottom: 12,
  },
  optionButtonPressed: {
    backgroundColor: '#e0e0e0', // Darker background on press
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#4f4f4f', // Text color remains the same
    marginLeft: 10,
    fontFamily: 'Helvetica',
  },
  icon: {
    color: '#6e6e6e',
  },
});

export default ProfileOptions;
