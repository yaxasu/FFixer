import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getProfileData } from '@/app/functions/storage';

const EditInformationScreen = () => {
  const data = getProfileData()
  const infoItems = [
    { title: 'Email', value: data.email },
    { title: 'Phone Number', value:`(${data.phone_number.slice(0, 3)}) ${data.phone_number.slice(3, 6)}-${data.phone_number.slice(6, 10)}` },
    { title: 'Password', value: '********' },
    { title: 'Name', value: `${data.first_name} ${data.last_name}`},
    { title: 'Country', value: data.citizenship },
    // Add more items as needed
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {infoItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => {}}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', // Light gray border for separation
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#000000', // Black text for high contrast
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#757575', // Dark gray for secondary information
  },
});

export default EditInformationScreen;
