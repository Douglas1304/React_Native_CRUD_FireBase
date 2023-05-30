
import React from 'react'
import { Button, StyleSheet, Text, View,SafeAreaView } from 'react-native'

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigator/StackNavigator';
//importar los componentes


const App = () => {
  return (
    <NavigationContainer>
    <StackNavigator/>
    </NavigationContainer>
  )
}

export default App;

