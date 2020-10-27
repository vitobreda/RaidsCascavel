import React, { useState, useEffect } from 'react';
import { Alert, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import RaidsTextInput from '../Components/RaidsTextInput';
import RaidsButtom from '../Components/RaidsButtom';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import * as S from './styles'

export default function Login() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    //auth().signOut().then(() => console.log('user are logout')).catch((err) => console.log(err))

    auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        authUser.getIdToken()
        .then((token) => { setToken(token) })
        .catch((err) => {
          Alert.alert(
            "Falha ao solicitar o token",
            err.message)
        })
      }
    });
  }, [])

  useEffect(() => {
    console.log('manteve a sessão com o token: ', token)
  }, [token])

  function login() {
    auth().face

    auth().signInWithEmailAndPassword(user, password)
      .then((success) => {
        setUser(success.user)
        success.user.getIdToken()
          .then((token) => { setToken(token) })
          .catch((err) => {
            Alert.alert(
              "Falha ao solicitar o token",
              err.message)
          })
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/wrong-password':
            Alert.alert(
              "Falha no login",
              "Usuario ou senha invalidos")
            break;
          case 'auth/user-not-found':
            Alert.alert(
              "Falha no login",
              "Nenhum usuario encontrado esse endereço de email")
            break;
          default:
            Alert.alert(
              "Falha no login",
              "Ocorreu um erro ao tentar fazer o login")
        }
      })
  }

  function getFacebookToken() {
    AccessToken.getCurrentAccessToken()
      .then(
        (data) => {
          console.log('facebook data: ', data)
          if (data) {
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential).then((value) => {console.log('firebase auth with facebook: ', value)}).catch((err) => {console.log(err)});
            
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
      <S.WrapperContent>
        <Image
          style={{
            width: 300,
            height: 150,
            alignSelf: "center",
            marginTop: '-10%',
            marginBottom: '10%'
          }}
          source={require('../Assets/Logo.png')}
        />
        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Email"
            textValue={user}
            onChangeText={(value) => setUser(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Password"
            secureTextEntry={true}
            textValue={password}
            onChangeText={(value) => setPassword(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsButtom
            textValue="Continuar"
            onPres={() => login()}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <S.ContainerFacebookButtom
            onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
          >
            <S.TextFacebookButtom>Logar com o Facebook</S.TextFacebookButtom>
          </S.ContainerFacebookButtom>
        </S.ComponentWrapper>

      </S.WrapperContent>
    </S.PageDefault>
  );
}