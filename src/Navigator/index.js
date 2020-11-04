import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StateContext } from '../Context';
import * as FirebaseFunctions from '../FirebaseFunctions';
import auth, { firebase } from '@react-native-firebase/auth';
import SignedIn from './SignedIn';
import SignedOut from './SignedOut';

export default function Navigator(props) {
  const { state, actions } = useContext(StateContext);

  useEffect(() => {
    auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log('usuario: ', authUser);
        authUser
          .getIdToken()
          .then((token) => {
            actions.setUser({
              email: authUser.email,
              name: authUser.name,
              token: token,
            });
          })
          .catch((err) => {
            actions.setUser({
              email: null,
              name: null,
              token: null,
            });
            Alert.alert('Falha ao solicitar o token', err.message);
          });
      } else {
        actions.setUser({
          email: null,
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
