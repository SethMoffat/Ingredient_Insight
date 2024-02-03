import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button as RNButton } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { Button, Menu, Provider, Title, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ScannerScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const allergies = route.params ? route.params.allergies : 'None'; // Get allergies from route.params or default to 'None'
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MaterialCommunityIcons name="barcode-scan" size={70} color="black" />
        </View> 
        <Surface style={[styles.surface, {alignItems: 'center', justifyContent: 'center'}]}>
          <Title style={styles.title}>Scan a product</Title>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, {alignItems: 'center', justifyContent: 'center'}]}
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
    borderRadius: 28,
    alignItems: 'center', // Center the children horizontally
    margin: 16, // Add margin
  },
  title: {
    fontSize: 36, // Increase font size
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333', // Darker color for better visibility
  },
  header: {
    fontSize: 26,
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