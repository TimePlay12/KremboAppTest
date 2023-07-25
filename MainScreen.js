import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <ImageBackground source={require('../Background/MainScreen.jpg')} style={styles.container} resizeMode="cover">
      <Image source={require('../Photos/logoImage.jpg')} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ApprenticePlacement')}>
          <Image source={require('../Photos/buttonImage.jpg')} style={styles.button} />
        </TouchableOpacity>
        <View style={styles.smallButtonContainer}>
          <TouchableOpacity onPress={() => Alert.alert('First button pressed!')}>
            <Image source={require('../Photos/test.jpg')} style={styles.smallButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../Photos/test.jpg')} style={styles.smallButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image source={require('../Photos/test.jpg')} style={styles.smallButton} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 50,  // adjust this value as needed
    width: 100,  // adjust this value as needed
    height: 100,  // adjust this value as needed
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  button: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  smallButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  smallButton: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
