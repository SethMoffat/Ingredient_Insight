import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, LogBox } from 'react-native';
import { Provider, Title, Surface, Paragraph, Button } from 'react-native-paper';
import seedOils from '../constants/seedOils';
import { unhealthySweeteners, isUnhealthySweetener } from '../constants/unhealthySweeteners';

const normalizeString = str => str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

const IngredientsScreen = ({ route, navigation }) => {
  const { ingredients, allergies } = route.params;
  const [healthConcerns, setHealthConcerns] = useState([]);
  const [allergyConcerns, setAllergyConcerns] = useState([]);

  const peanut_list = [
    "Peanuts",
    "Peanut Butter",
    "Peanut Oil",
    "Peanut Flour",
    "Hydrolyzed Vegetable Protein",
    "Lecithin",
    "peanut lecithin",
    "Nougat",
    "Textured Vegetable Protein",
    "Carrageenan",
  ];
  const egg_list = [
    "Egg",
    "Whole egg",
    "Egg whites",
    "Egg yolks",
    "Egg powder",
    "Egg solids",
    "Albumin",
    "Mayonnaise",
    "Marshmallows",
    "Nougat",
    "Pasta",
    "Baked goods",
    "Cake",
    "Breading",
  ];
  const soybean_list = [
    "Soybeans",
    "Soy",
    "Soy protein",
    "Soy flour",
    "Soy oil",
    "Soy lecithin",
    "Edamame",
    "Miso",
    "Natto",
    "Soy sauce",
    "Tamari",
    "Soy milk",
    "Tofu",
    "Tempeh",
    "Textured vegetable protein",
    "TVP",
    "Soybean oil",
    "Hydrolyzed soy protein",
    "Soy isolate",
    "Soybean sprouts",
    "Soybean oil",
    "Soy-based additives",
    "Vegetable protein",
  ];
  const wheat_list = [
    "Wheat",
    "Wheat flour",
    "Whole wheat",
    "Durum wheat",
    "Semolina",
    "Bulgur",
    "Farina",
    "Spelt",
    "Kamut",
    "Einkorn",
    "Wheat germ",
    "Wheat bran",
    "Wheat starch",
    "Wheat protein",
    "Modified wheat starch",
    "Hydrolyzed wheat protein",
    "Vital wheat gluten",
    "Wheat-based additives",
    "Couscous",
    "Bread",
    "Pasta",
    "Crackers",
    "Beer ",
    "Soy sauce",
  ];
  const shellfish_list = [
    "Shellfish",
    "Shrimp",
    "Crab",
    "Lobster",
    "Crayfish",
    "Clams",
    "Mussels",
    "Oysters",
    "Scallops",
    "Abalone",
    "Squid",
    "Octopus",
    "Cuttlefish",
    "Snails",
    "Cockles",
    "Periwinkles",
    "Sea urchin",
    "Sea cucumber",
    "Barnacles",
    "Surimi",
    "Shellfish extract",
    "Shellfish paste",
    "Shellfish sauce",
  ];

  useEffect(() => {
    if (typeof ingredients !== 'string') return;
  
    const ingredientsArray = ingredients.split(',').map(normalizeString);
  
    const allergyLists = {
      'Peanuts': peanut_list,
      'Shellfish': shellfish_list,
      'Soybean': soybean_list,
      'Gluten': wheat_list,
      'Egg': egg_list,
    }

    const selectedAllergyList = allergyLists[allergies];

  const foundSeedOils = seedOils.map(normalizeString).filter((oil) => ingredientsArray.includes(oil));
  const foundSweeteners = unhealthySweeteners.map(normalizeString).filter((sweetener) => ingredientsArray.includes(sweetener));
  const foundAllergies = selectedAllergyList.map(normalizeString).filter((allergy) => ingredientsArray.includes(allergy));

  setHealthConcerns([...foundSeedOils, ...foundSweeteners]);
  setAllergyConcerns(foundAllergies);
}, [ingredients, allergies]);

  return (
    <Provider>
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Title style={styles.title}>Ingredients</Title>
          <ScrollView>
            <Paragraph style={styles.paragraph}>{ingredients}</Paragraph>
          </ScrollView>
          <Title style={styles.title}>General Health Concerns</Title>
          <ScrollView>
            {healthConcerns.length > 0 ? (
              healthConcerns.map((concern, index) => (
                <Paragraph key={index} style={styles.paragraph}>{concern}</Paragraph>
              ))
            ) : (
              <Paragraph style={styles.paragraph}>No Health Concerns Detected</Paragraph>
            )}
          </ScrollView>
          {allergies !== 'None' && (
            <>
              <Title style={styles.title}>Allergies</Title>
              <ScrollView>
                {allergyConcerns.length > 0 ? (
                  allergyConcerns.map((concern, index) => (
                    <Paragraph key={index} style={styles.paragraph}>{concern}</Paragraph>
                  ))
                ) : (
                  <Paragraph style={styles.paragraph}>No Allergies Detected</Paragraph>
                )}
              </ScrollView>
            </>
          )}
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