import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FirstScreen from 'screens/first/FirstScreen';
import SecondScreen from 'screens/second/SecondScreen';

import {ROUTE} from './routes';

const Stack = createNativeStackNavigator();

const Router: React.FC = () => (
  <Stack.Navigator initialRouteName={ROUTE.FIRST_SCREEN}>
    <Stack.Screen name={ROUTE.FIRST_SCREEN} component={FirstScreen} />
    <Stack.Screen name={ROUTE.SECOND_SCREEN} component={SecondScreen} />
  </Stack.Navigator>
);

export default Router;
