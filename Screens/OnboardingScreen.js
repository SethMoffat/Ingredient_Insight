import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import { Button, Menu, Provider, Title, Surface } from 'react-native-paper';

const OnboardingScreen = ({ navigation }) => {
  const [allergies, setAllergies] = useState('');
  const [visibleAllergies, setVisibleAllergies] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }
    ).start();
  }, [fadeAnim])

  const handleContinue = () => {
    navigation.navigate('Scanner', { allergies });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <Animated.View style={{...styles.surface, opacity: fadeAnim}}>
          <Title style={styles.title}>Let's get started!</Title>
          <Text style={styles.paragraph}>Select your allergies:</Text>
          <Menu
            visible={visibleAllergies}
            onDismiss={() => setVisibleAllergies(false)}
            anchor={<Button mode="outlined" onPress={() => setVisibleAllergies(true)}>{allergies || "Select Allergies"}</Button>}
          >
            <Menu.Item onPress={() => {setAllergies('None'); setVisibleAllergies(false);}} title="None" />
            <Menu.Item onPress={() => {setAllergies('Peanuts'); setVisibleAllergies(false);}} title="Peanuts" />
            <Menu.Item onPress={() => {setAllergies('Gluten'); setVisibleAllergies(false);}} title="Gluten" />
            <Menu.Item onPress={() => {setAllergies('Shellfish'); setVisibleAllergies(false);}} title="Shellfish" />
            <Menu.Item onPress={() => {setAllergies('Soybean'); setVisibleAllergies(false);}} title="Soybean" />
            <Menu.Item onPress={() => {setAllergies('Egg'); setVisibleAllergies(false);}} title="Egg" />
          </Menu>
          <Button mode="contained" style={styles.button} onPress={handleContinue}>Continue</Button>
        </Animated.View>
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
    borderRadius: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default OnboardingScreen;