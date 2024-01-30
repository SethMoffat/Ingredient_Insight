import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Menu, Provider } from 'react-native-paper';

const OnboardingScreen = ({ navigation }) => {
  const [allergies, setAllergies] = useState('');
  const [healthConcerns, setHealthConcerns] = useState('');
  const [visibleAllergies, setVisibleAllergies] = useState(false);
  const [visibleHealthConcerns, setVisibleHealthConcerns] = useState(false);

  const handleContinue = () => {
    navigation.navigate('Home', { allergies, healthConcerns });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.title}>Let's get started!</Text>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Select your allergies:</Text>
          <Menu
            visible={visibleAllergies}
            onDismiss={() => setVisibleAllergies(false)}
            anchor={<Button title={allergies || "Select Allergies"} onPress={() => setVisibleAllergies(true)} />}
          >
            <Menu.Item onPress={() => {setAllergies('None'); setVisibleAllergies(false);}} title="None" />
            <Menu.Item onPress={() => {setAllergies('Peanuts'); setVisibleAllergies(false);}} title="Peanuts" />
            <Menu.Item onPress={() => {setAllergies('Tree nuts'); setVisibleAllergies(false);}} title="Tree nuts" />
            <Menu.Item onPress={() => {setAllergies('Milk'); setVisibleAllergies(false);}} title="Milk" />
          </Menu>
        </View>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Select your health concerns:</Text>
          <Menu
            visible={visibleHealthConcerns}
            onDismiss={() => setVisibleHealthConcerns(false)}
            anchor={<Button title={healthConcerns || "Select Health Concerns"} onPress={() => setVisibleHealthConcerns(true)} />}
          >
            <Menu.Item onPress={() => {setHealthConcerns('None'); setVisibleHealthConcerns(false);}} title="None" />
            <Menu.Item onPress={() => {setHealthConcerns('Diabetes'); setVisibleHealthConcerns(false);}} title="Diabetes" />
            <Menu.Item onPress={() => {setHealthConcerns('High blood pressure'); setVisibleHealthConcerns(false);}} title="High blood pressure" />
            <Menu.Item onPress={() => {setHealthConcerns('Heart disease'); setVisibleHealthConcerns(false);}} title="Heart disease" />
          </Menu>
        </View>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginBottom: 20,
    width: '80%',
    padding: 10,
  },
});

export default OnboardingScreen;