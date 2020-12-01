import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Screens/Home';

const Stack = createStackNavigator();

export default function SignedIn(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
