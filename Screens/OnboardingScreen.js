import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Menu, Provider, Title, Surface } from 'react-native-paper';

const OnboardingScreen = ({ navigation }) => {
  const [allergies, setAllergies] = useState('');
  const [visibleAllergies, setVisibleAllergies] = useState(false);

  const handleContinue = () => {
    navigation.navigate('Scanner', { allergies });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Title style={styles.title}>Let's get started!</Title>
          <Text style={styles.paragraph}>Select your allergies:</Text>
          <Menu
            visible={visibleAllergies}
            onDismiss={() => setVisibleAllergies(false)}
            anchor={<Button mode="outlined" onPress={() => setVisibleAllergies(true)}>{allergies || "Select Allergies"}</Button>}
          >
            <Menu.Item onPress={() => {setAllergies('None'); setVisibleAllergies(false);}} title="None" />
            <Menu.Item onPress={() => {setAllergies('Peanuts'); setVisibleAllergies(false);}} title="Peanuts" />
            {/* Add more Menu.Item components for other allergies */}
          </Menu>
          <Button mode="contained" style={styles.button} onPress={handleContinue}>Continue</Button>
        </Surface>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  surface: {
    padding: 16,
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Add this line
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Add this line
  },
  button: {
    marginTop: 16,
  },
});

export default OnboardingScreen;