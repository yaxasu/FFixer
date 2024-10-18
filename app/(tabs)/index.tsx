import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation()

  const handleGetStartedPress = () => {
    navigation.navigate('auth' as unknown as never);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/welcome.png')} // Your background image here
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.logoText}>FFixer</Text>

        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStartedPress}>
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between', // Distribute content between top and bottom
  },
  logoText: {
    fontSize: 48,
    fontFamily: 'helvetica_bold',
    color: '#141414',
    marginTop: 100, // Adjust to move the text further down if needed

  },
  getStartedButton: {
    alignSelf: 'center', // Center the button horizontally
    width: '90%',
    height: 60,
    padding: 15,
    backgroundColor: '#141414',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 75,
    justifyContent: 'center'
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'helvetica',
  },
});
