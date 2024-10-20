import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileHeader = () => {
  const userName = 'Name'; // Placeholder
  const userEmail = 'email@example.com'; // Placeholder

  return (
    <View style={styles.headerContainer}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  userInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'helvetica'
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'helvetica'
  },
});

export default ProfileHeader;
