import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { MapScreen } from './Map'; // Importamos el componente MapScreen
import LoginForm from './login'; 
import Signup from './Signup'; 
import Home from './Home'; 
import Report from './Report'; 
import Transition from './transition'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PictureTaken from './PictureTaken';
import OtherComponent from './OtherComponent';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Transition" component={Transition} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Image" component={PictureTaken} />
        <Stack.Screen name="Other" component={OtherComponent} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
