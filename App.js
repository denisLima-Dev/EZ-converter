import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar } from 'react-native'
import Routes from './src/Routes'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (

    <NavigationContainer >
      <StatusBar barStyle='light-content' backgroundColor='rgba(48, 49, 58, 1)' />
      <Routes />

    </NavigationContainer>
  );
}

  
