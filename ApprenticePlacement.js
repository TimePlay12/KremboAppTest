import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Alert, Modal, Button, ScrollView } from 'react-native';
import { collection, query, onSnapshot, doc, updateDoc, getDoc, deleteField } from 'firebase/firestore';
import db from '../firebaseConfig';

const OptionButton = ({ title, onChangeName, assignedKid, removeAssignedKid }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(title);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, '/הוד השרון/ממלאכתי א/שכבג'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const optionsArr = [];
      querySnapshot.forEach((doc) => {
        optionsArr.push({ name: doc.data().name, id: doc.id, isAssigned: doc.data().isAssigned });
      });
      setOptions(optionsArr);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (assignedKid) {
      const assignedOption = options.find(option => option.id === assignedKid);
      if (assignedOption) {
        setSelectedOption(assignedOption.name);
      }
    }
  }, [assignedKid, options]);

  const handlePress = async (uniqueOption) => {
    const [option, id] = uniqueOption.split('-');
    const docRef = doc(db, '/הוד השרון/ממלאכתי א/שכבג', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && docSnap.data().isAssigned) {
      Alert.alert(
        'Warning',
        'This kid is already assigned. Are you sure you want to reassign?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              await updateDoc(docRef, { isAssigned: false });
              setSelectedOption(option);
              setModalVisible(false);
              onChangeName(id);
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      setSelectedOption(option);
      setModalVisible(false);
      onChangeName(id);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {selectedOption}
        </Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 35, alignItems: 'center', borderRadius: 10 }}>
            {options.map((option, index) => (
              <Button
                key={`${option.name}-${index}`}
                title={option.name}
                onPress={() => handlePress(`${option.name}-${option.id}`)}
              />
            ))}
            <Button title="Remove" color="red" onPress={() => { removeAssignedKid(); setModalVisible(false); }} />
            <Button title="חזור" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function ApprenticePlacement({ navigation }) {
  const [names, setNames] = useState([]);

  const fetchNames = () => {
    const q = query(collection(db, '/הוד השרון/ממלאכתי א/חניכים'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const namesArr = [];
      querySnapshot.forEach((doc) => {
        namesArr.push({ name: doc.data().name, id: doc.id, assignedKid1: doc.data().assignedKid1, assignedKid2: doc.data().assignedKid2 });
      });
      setNames(namesArr);
    });

    return unsubscribe;
  };

  useEffect(() => {
    return fetchNames();
  }, []);

  const handleChangeName = async (selectedName, index, kidNumber) => {
    const updatedNames = [...names];
    updatedNames[index][`assignedKid${kidNumber}`] = selectedName;
    setNames(updatedNames);

    const docRef = doc(db, '/הוד השרון/ממלאכתי א/חניכים', updatedNames[index].id);
    await updateDoc(docRef, {
      [`assignedKid${kidNumber}`]: selectedName
    });

    fetchNames();
  };

  const handleRemoveAssignedKid = async (index, kidNumber) => {
    const updatedNames = [...names];
    delete updatedNames[index][`assignedKid${kidNumber}`];
    setNames(updatedNames);

    const docRef = doc(db, '/הוד השרון/ממלאכתי א/חניכים', updatedNames[index].id);
    await updateDoc(docRef, {
      [`assignedKid${kidNumber}`]: deleteField()
    });

    fetchNames();
  };

  const ChartContainer = names.length > 5 ? ScrollView : View;

  return (
    <ImageBackground source={require('../Background/MainScreen.jpg')} style={styles.container} resizeMode="cover">
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>חזור</Text>
        </TouchableOpacity>
      </View>
      <ChartContainer style={styles.chartContainer}>
        <View style={styles.row}>
          <View style={styles.column1}>
            <Text style={styles.columnText}>חונכים</Text>
          </View>
          <View style={styles.column2}>
            <Text style={styles.columnText}>חניכים</Text>
          </View>
        </View>
        {names.map((nameObj, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.column1}>
              <OptionButton title="חונך" onChangeName={(selectedName) => handleChangeName(selectedName, index, 1)} removeAssignedKid={() => handleRemoveAssignedKid(index, 1)} assignedKid={nameObj.assignedKid1} />
              <OptionButton title="חונך" onChangeName={(selectedName) => handleChangeName(selectedName, index, 2)} removeAssignedKid={() => handleRemoveAssignedKid(index, 2)} assignedKid={nameObj.assignedKid2} />
            </View>
            <View style={styles.column2}>
              <Text style={styles.columnText}>{nameObj.name}</Text>
            </View>
          </View>
        ))}
      </ChartContainer>
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
    height: '80%',
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
