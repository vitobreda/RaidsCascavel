import React, { useContext, useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { StateContext } from '../../Commons/ContextApi';
import auth from '@react-native-firebase/auth';

export default function Home(props) {
  const { state, actions } = useContext(StateContext);
  //const [user, setUser] = useState(state.user);

  /*useEffect(() => {
    console.log('state value: ', state);
    setUser(state.user);
  }, [state]);*/

  function clicl() {
    actions.setUser({
      name: 'Novo valor a partir do Action',
    });
  }

  function Logout() {
    auth()
      .signOut()
      .then(() => {
        actions.setUser({
          name: null,
          token: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View>
      <Button title="Logout" onPress={() => Logout()} />
      <Button title="Atualizar status" onPress={() => clicl()} />
      {state.user.name && <Text>{state.user.name}</Text>}
    </View>
  );
}
