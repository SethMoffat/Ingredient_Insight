import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import seedOils from '../constants/seedOils';
import unhealthySweeteners from '../constants/unhealthySweeteners';

const IngredientsScreen = ({ route, navigation }) => {
  const { ingredients } = route.params;
  const [healthConcerns, setHealthConcerns] = useState([]);

  useEffect(() => {
    if (!Array.isArray(ingredients)) return;
    
    const foundSeedOils = seedOils.filter((oil) => ingredients.includes(oil));
    const foundSweeteners = unhealthySweeteners.filter((sweetener) => ingredients.includes(sweetener));
    setHealthConcerns([...foundSeedOils, ...foundSweeteners]);
  }, [ingredients]);

  return (
    <View style={styles.container}>
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <Text style={styles.ingredientsText}>{ingredients}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>Allergies</Text>
        <Text style={styles.infoBoxText}>Content Here</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxTitle}>Health Concerns</Text>
        {healthConcerns.length > 0 ? (
          healthConcerns.map((concern, index) => (
            <Text key={index} style={styles.infoBoxText}>{concern}</Text>
          ))
        ) : (
          <Text style={styles.infoBoxText}>No Health Concerns Detected</Text>
        )}
      </View>
      <Button title="Scan Again" onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5DC',
    padding: 20,
  },
  ingredientsTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Cochin',
  },
  ingredientsText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Cochin',
  },
  infoBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
  },
  infoBoxTitle: {
    fontSize: 20,
    fontFamily: 'Cochin',
    marginBottom: 10,
  },
  infoBoxText: {
    fontSize: 16,
    fontFamily: 'Cochin',
  },
});

export default IngredientsScreen;