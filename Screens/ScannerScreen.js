import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button as RNButton } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { Button, Menu, Provider, Title, Surface } from 'react-native-paper';

export default function ScannerScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const { allergies } = route.params; // Get allergies from route.params

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);

    if(response.data.status === 1) {
      navigation.navigate('Ingredients', { ingredients: response.data.product.ingredients_text, allergies });
    } else {
      navigation.navigate('Ingredients', { ingredients: 'Product not found', allergies });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Text style={styles.header}>Scan a barcode</Text>
        <Surface style={styles.surface}>
          <Title style={styles.title}>Scan a product</Title>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </Surface>
        {scanned && <Button mode="contained" onPress={() => setScanned(false)}>Tap to Scan</Button>}
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
    alignItems: 'center', // Center the children horizontally
    margin: 16, // Add margin
  },
  title: {
    fontSize: 28, // Increase font size
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333', // Darker color for better visibility
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});