import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StateContext } from '../Context';
import auth from '@react-native-firebase/auth';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

export default function Navigator(props) {
  const { state, actions } = useContext(StateContext);

  useEffect(() => {
    auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        authUser
          .getIdToken()
          .then((token) => {
            actions.setUser({
              name: authUser.name,
              token: token,
            });
          })
          .catch((err) => {
            actions.setUser({
              name: null,
              token: null,
            });
            Alert.alert('Falha ao solicitar o token', err.message);
          });
      } else {
        actions.setUser({
          name: null,
          token: null,
        });
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {state.user.token ? <SignedIn /> : <SignedOut />}
    </NavigationContainer>
  );
}
