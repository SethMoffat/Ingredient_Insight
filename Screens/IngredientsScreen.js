import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, LogBox } from 'react-native';
import { Provider, Title, Surface, Paragraph, Button } from 'react-native-paper';
import seedOils from '../constants/seedOils';
import { unhealthySweeteners, isUnhealthySweetener } from '../constants/unhealthySweeteners';

const normalizeString = str => str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

const IngredientsScreen = ({ route, navigation }) => {
  const { ingredients } = route.params;
  const [healthConcerns, setHealthConcerns] = useState([]);

  useEffect(() => {
    if (typeof ingredients !== 'string') return;

    const ingredientsArray = ingredients.split(',').map(normalizeString);

    const foundSeedOils = seedOils.map(normalizeString).filter((oil) => ingredientsArray.includes(oil));
    const foundSweeteners = unhealthySweeteners.map(normalizeString).filter((sweetener) => ingredientsArray.includes(sweetener));

    setHealthConcerns([...foundSeedOils, ...foundSweeteners]);
  }, [ingredients]);

  return (
    <Provider>
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Title style={styles.title}>Ingredients</Title>
          <ScrollView>
            <Paragraph style={styles.paragraph}>{ingredients}</Paragraph>
          </ScrollView>
          <Title style={styles.title}>Health Concerns</Title>
          <ScrollView>
            {healthConcerns.length > 0 ? (
              healthConcerns.map((concern, index) => (
                <Paragraph key={index} style={styles.paragraph}>{concern}</Paragraph>
              ))
            ) : (
              <Paragraph style={styles.paragraph}>No Health Concerns Detected</Paragraph>
            )}
          </ScrollView>
          <Button mode="contained" onPress={() => navigation.navigate('Scanner')}>Scan Again</Button>
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
    padding: 32, // Increase padding
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16, // Add margin
  },
  title: {
    fontSize: 28, // Increase font size
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333', // Darker color for better visibility
  },
  paragraph: {
    fontSize: 18, // Increase font size
    color: '#333', // Darker color for better visibility
    marginBottom: 16, // Add margin bottom
  },
});

export default IngredientsScreen;