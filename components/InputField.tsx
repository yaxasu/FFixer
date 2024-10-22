// InputField.tsx

import React from 'react';
import { View, TextInput, Text, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface InputFieldProps {
  name: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  error,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#555555"
      keyboardType={keyboardType}
      onChangeText={onChangeText}
      value={value}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    fontFamily: 'helvetica',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
