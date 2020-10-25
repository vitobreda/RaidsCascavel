import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import RaidsTextInput from '../Components/RaidsTextInput';
import RaidsButtom from '../Components/RaidsButtom';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import * as S from './styles'

export default function Login() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    //login('pokeminifu@gmail.com', 'mypassword')
    //getFacebookToken();
  }, [user, password]);


  function login(user, password) {
    auth().signInWithEmailAndPassword(user, password)
      .then((success) => {
        setUser(success.user)
        success.user.getIdToken()
          .then((token) => { console.log('token: ', token) })
          .catch((err) => { console.log('ocorreu um erro ao solicitar o token: ', err) })
      })
      .catch((err) => { console.log('ocorreu um erro ao fazer login', err) })
  }

  function getFacebookToken() {
    AccessToken.getCurrentAccessToken()
      .then(
        (data) => {
          console.log('facebook data: ', data)
          if (data) {
            console.log('facebook token', data.accessToken)
            return data.accessToken;
          }
        })
      .catch((err) => { console.log('ocorreu um erro ao tentar requisitar o token do facebook: ', err) })
  }


  async function onFacebookButtonPress() {
    // Attempt login with permissions
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          return getFacebookToken()
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );

  }

  async function onFacebookLogout() {
    LoginManager.logOut()
  }


  return (
    <S.PageDefault>
      <RaidsTextInput
        placeholder="Email"
        textValue={user}
        onChangeText={(value) => setUser(value)}
      >
      </RaidsTextInput>
      <RaidsTextInput
        placeholder="Password"
        secureTextEntry={true}
        textValue={password}
        onChangeText={(value) => setPassword(value.newValue)}
      >
      </RaidsTextInput>
      

      <RaidsButtom textValue="Continuar" />

      <S.ContainerFacebookButtom
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
      >
        <S.TextFacebookButtom>Logar com o Facebook</S.TextFacebookButtom>
      </S.ContainerFacebookButtom>
    </S.PageDefault>
  );
}