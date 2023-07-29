import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const OnboardingScreen = ({ navigation }) => {
  const [allergies, setAllergies] = useState('');
  const [healthConcerns, setHealthConcerns] = useState('');

  const handleContinue = () => {
    // You can save these to a global state (like Redux) or persist in local storage or secure storage.
    // Here, we are simply passing them to the next screen.
    navigation.navigate('Home', { allergies, healthConcerns }); // replace 'Home' with the name of your home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's get started!</Text>
      <Text style={styles.label}>Enter your allergies:</Text>
      <TextInput
        style={styles.input}
        value={allergies}
        onChangeText={setAllergies}
        placeholder="Allergies"
      />
      <Text style={styles.label}>Enter your health concerns:</Text>
      <TextInput
        style={styles.input}
        value={healthConcerns}
        onChangeText={setHealthConcerns}
        placeholder="Health Concerns"
      />
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default OnboardingScreen;
