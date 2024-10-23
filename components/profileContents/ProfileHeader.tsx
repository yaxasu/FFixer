import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getProfileData } from '@/app/api/storage';

const ProfileHeader = () => {
  const profile = getProfileData()

  const userName = `${profile.first_name} ${profile.last_name[0]}.`
  const userRole = 
    profile.user_role === "admin" ? "Staff" :
    profile.user_role === "worker" ? "FFixer" :
    "Core Member";

  return (
    <View style={styles.headerContainer}>
      <Image 
        source={{ uri: profile.profile_picture_url ? profile.profile_picture_url: 'https://i.pravatar.cc/150?img=50' }}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userRole}</Text>
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
