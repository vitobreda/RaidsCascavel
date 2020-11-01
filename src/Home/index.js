import React from 'react';
import { View, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Home(props) {
  function Logout() {
    auth()
      .signOut()
      .then(() => console.log('user are logout'))
      .catch((err) => console.log(err));

    props.navigation.navigate('Login');
  }

  return <Button title="Logout" onPress={() => Logout()}></Button>;
}
