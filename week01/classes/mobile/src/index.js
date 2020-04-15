import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, FlatList, SafeAreaView, TextInput, Button } from 'react-native';
import api from './services/api';

export default function App() {
  const [cats, setCats] = useState([]);
  const [catName, setCatName] = useState('');
  const [catNameError, setCatNameError] = useState(false);
  const [catAge, setCatAge] = useState('');
  const [catAgeError, setCatAgeError] = useState(false);

  function loadCats() {
    api.get('cats')
      .then((res) => {
        setCats(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(loadCats, []);

  function handleSubmit() {
    let anyError =  false;
    if (!catName) {
      setCatNameError(true);
      anyError = true;
    } else {
      setCatNameError(false);
    }

    if (!catAge) {
      setCatAgeError(true);
      anyError = true;
    } else {
      setCatAgeError(false);
    }

    if (anyError) {
      return;
    }

    const newCat = {
      name: catName,
      age: catAge
    };

    api.post('cats', newCat)
      .then((res) => {
        setCats([... cats, res.data]);
        setCatName('');
        setCatAge('');
        setCatNameError(false);
        setCatAgeError(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <TextInput
          style={catNameError ? [styles.input, styles.inputError] : styles.input}
          placeholder="Nome do gato"
          onChangeText={name => setCatName(name)}
          defaultValue={catName}
          required={true}
        />

        <TextInput
          style={catAgeError ? [styles.input, styles.inputError] : styles.input}
          placeholder="Idade do gato"
          onChangeText={age => setCatAge(age)}
          defaultValue={catAge}
          required={true}
        />

        <Button
          onPress={handleSubmit}
          title="Enviar"
        />

        <FlatList
          data={cats}
          keyExtractor={cat => cat.id}
          renderItem={({item: cat}) => {
            return (
              <View style={styles.card}>
                <Text style={styles.title}>{cat.name}</Text>
                <Text style={styles.subTitle}>{cat.age} {cat.age === 1 ? 'ano' : 'anos'}</Text>
              </View>
            )
          }}>
        </FlatList>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  card: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold'
  },

  subTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#FFF',
   marginBottom: 20
  },

  inputError: {
    borderWidth: 3,
    borderColor: 'red'
  }
});
