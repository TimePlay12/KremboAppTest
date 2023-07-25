import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert, Image, ImageBackground } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebaseConfig'; // adjust the path based on where your firebaseConfig.js is located

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const sendDataToFirebase = async () => {
    if (name && email && password) {
      try {
        const data = {
          name: name,
          email: email,
          password: password,
        };
        const collectionPath = collection(db, '/הוד השרון/ממלאכתי א/שכבג');
        await addDoc(collectionPath, data);
        console.log('Data sent successfully!');
        Alert.alert('Success', 'Data sent successfully!');
        navigation.navigate('Main');
      } catch (error) {
        console.error('Error sending data:', error);
        Alert.alert('Error', 'Error sending data. Please try again.');
      }
    } else {
      console.log('Please enter name, email and password.');
      Alert.alert('Error', 'Please enter name, email and password.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground source={require('../Background/MainScreen.jpg')} style={styles.container} resizeMode="cover">
        <Image source={require('../Photos/logoImage.jpg')} style={styles.logo} />
        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
        />
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* Button to send data */}
        <TouchableOpacity onPress={sendDataToFirebase} style={styles.button}>
          <Text style={styles.buttonText}>Send Data</Text>
        </TouchableOpacity>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
  },
});
