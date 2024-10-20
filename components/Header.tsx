import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        <Ionicons name="chevron-back" size={28} color="#141414" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    borderBottomColor: '#000',
    justifyContent: 'center',
    marginTop: 40,
    paddingLeft: 10
  },
  closeButton: {
    paddingLeft: 10,
  },
});

export default Header;
