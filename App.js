import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import HomeScreen from './Screens/HomeScreen';
import ScannerScreen from './Screens/ScannerScreen';
import IngredientsScreen from './Screens/IngredientsScreen'; // import IngredientsScreen

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Cochin: require('./assets/fonts/Cochin.ttf'), // replace with the path to your font file
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="Ingredients" component={IngredientsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}