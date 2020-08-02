import  React from 'react';
import { createStackNavigator , HeaderBackButton } from '@react-navigation/stack';
import  Menu from '../pages/menu'
import Length from '../pages/length'
import Temperature from '../pages/temperature'
import Weight from '../pages/weight'
import Speed from '../pages/speed'
import Volume from '../pages/volume'
import Area from '../pages/area'
import Currency from '../pages/currency'
import Pressure from '../pages/pressure'

import Teste from '../pages/temperature/teste'


const Stack = createStackNavigator();

const screenOption={
  headerStyle:{
  backgroundColor: 'rgba(48, 49, 58, 1)',
  },
  headerTitleAlign: 'center',
  gestureEnabled: true,
  headerTintColor: '#fff',
  navigationOptions: {
    gestureResponseDistance: { horizontal: 200 }, 
  },

  }

export default function Routes() {
  return (
      <Stack.Navigator initialRouteName='EZ Converter'>
        <Stack.Screen name="EZ Converter" component={Menu} options={ screenOption}/>
        <Stack.Screen name="Length" component={Length} options={screenOption } />
        <Stack.Screen name="Temperature" component={Temperature} options={screenOption} />
        <Stack.Screen name="Weight" component={Weight} options={screenOption} />
        <Stack.Screen name="Speed" component={Speed} options={screenOption} />
        <Stack.Screen name="Volume" component={Volume} options={screenOption} />
        <Stack.Screen name="Area" component={Area} options={screenOption} />
        <Stack.Screen name="Currency" component={Currency} options={screenOption} />
        <Stack.Screen name="Pressure" component={Pressure} options={screenOption} />
        <Stack.Screen name="Teste" component={Teste} options={screenOption} />

      </Stack.Navigator>
  );
}
