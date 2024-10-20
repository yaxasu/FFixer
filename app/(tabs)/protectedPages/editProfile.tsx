import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const profileFields = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Date of Birth', value: 'date_of_birth' },
  { label: 'Citizenship', value: 'citizenship' },
  { label: 'Address', value: 'address' },
];

export default function EditProfile() {
  const handlePress = (value:string) => {
    console.log(value)
  };

  return (
    <View style={styles.container}>
      {profileFields.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listItem}
          onPress={() => handlePress(item.value)}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
    color: '#000',
  },
});
