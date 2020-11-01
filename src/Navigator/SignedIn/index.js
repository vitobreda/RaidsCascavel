import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Home';

const Stack = createStackNavigator();

export default function SignedOut(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
