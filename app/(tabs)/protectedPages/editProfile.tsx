import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getProfileData } from '@/app/api/storage';

const EditInformationScreen = () => {
  const data = getProfileData();
  const infoItems = [
    { title: 'Email', value: data.email },
    { title: 'Phone Number', value: `(${data.phone_number.slice(0, 3)}) ${data.phone_number.slice(3, 6)}-${data.phone_number.slice(6, 10)}` },
    { title: 'Password', value: '********' },
    { title: 'First Name', value: data.first_name },
    { title: 'Last Name', value: data.last_name },
    { title: 'Country', value: data.citizenship },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  itemContainer: {
    paddingVertical: 18,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 10
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  title: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export default EditInformationScreen;
