import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import { collection, query, onSnapshot } from 'firebase/firestore';
import db from '../firebaseConfig';

const OptionButton = ({ title, onChangeName, selectedNames }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, '/הוד השרון/ממלאכתי א/שכבג'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const optionsArr = [];
      querySnapshot.forEach((doc) => {
        optionsArr.push(doc.data().name);
      });
      setOptions(optionsArr);
    });

    return () => unsubscribe();
  }, []);

  const handlePress = () => {
    if (selectedOption !== title) {
      Alert.alert(
        'Confirmation',
        'החונך תפוס האם אתה בטוח שאתה רוצה?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => onChangeName(selectedOption),
          },
        ],
      );
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.button, selectedNames.includes(selectedOption) && { backgroundColor: 'red' }]}
      >
        <Text style={[styles.buttonText, selectedNames.includes(selectedOption) && { color: 'white' }]}>
          {selectedOption}
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 35, alignItems: 'center', borderRadius: 10 }}>
            {options.map(option => (
              <Button
                key={option}
                title={option}
                onPress={() => {
                  setSelectedOption(option);
                  setModalVisible(false);
                }}
              />
            ))}
            <Button title="חזור" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function ApprenticePlacement({ navigation }) {
  const [names, setNames] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    const q = query(collection(db, '/הוד השרון/ממלאכתי א/חניכים'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const namesArr = [];
      querySnapshot.forEach((doc) => {
        namesArr.push(doc.data().name);
      });
      setNames(namesArr);
    });

    return () => unsubscribe();
  }, []);

  const handleChangeName = (selectedName) => {
    setSelectedNames(prevState => {
      // Deselect the previously selected name in the other rows
      const updatedNames = prevState.filter(name => name !== selectedName);
      return [...updatedNames, selectedName];
    });
  };

  return (
    <ImageBackground source={require('../Background/MainScreen.jpg')} style={styles.container} resizeMode="cover">
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>חזור</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.row}>
          <View style={styles.column1}>
            <Text style={styles.columnText}>חונכים</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.columnText}>חניכים</Text>
          </View>
        </View>
        {names.map((name, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.column1}>
              <OptionButton title="חניך" onChangeName={handleChangeName} selectedNames={selectedNames} />
            </View>
            <View style={styles.column2}>
              <Text style={styles.columnText}>{name}</Text>
            </View>
          </View>
        ))}
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
  buttonContainer: {
    position: 'absolute',
    top: 35,
    left: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
  },
  chartContainer: {
    width: '80%',
    height: '30%',
    position: 'absolute',
    top: 120,
  },
  row: {
    flexDirection: 'row',
  },
  column1: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#f2a64e',
    padding: 1,
  },
  column2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#f2a64e',
    padding: 1,
  },
  columnText: {
    fontSize: 20,
  },
});
