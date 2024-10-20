import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { clearToken } from '@/app/functions/storage'; // adjust path as needed

const ProfileActionButton = () => {
  const navigation = useNavigation();

  function handleLogout() {
    clearToken();
    navigation.navigate('index' as unknown as never);
  }

  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default ProfileActionButton;
