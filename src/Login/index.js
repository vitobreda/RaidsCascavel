import React, { useState, useContext } from 'react';
import { Alert, Image } from 'react-native';
import RaidsTextInput from '../Components/RaidsTextInput';
import RaidsButtom from '../Components/RaidsButtom';
import auth from '@react-native-firebase/auth';
import { StateContext } from '../Context';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as S from './styles';

export default function Login(props) {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const { state, actions } = useContext(StateContext);

  function getTokenFirebase(authUser) {
    setUser(authUser);
    authUser
      .getIdToken()
      .then((token) => {
        actions.setUser({
          name: authUser.name,
          token: token,
        });
      })
      .catch((err) => {
        Alert.alert('Falha ao solicitar o token', err.message);
      });
  }

  function login() {
    if (!user) {
      Alert.alert(
        'Informações incompletas',
        'Não foi informado um usuario',
      );
    } else if (!password) {
      Alert.alert(
        'Informações incompletas',
        'Não foi informado uma senha',
      );
    } else {
      auth()
        .signInWithEmailAndPassword(user, password)
        .then((success) => {
          if (success.user) {
            getTokenFirebase(success.user);
          }
        })
        .catch((err) => handleErrorLoginFirebase(err));
    }
  }

  function handleErrorLoginFirebase(error) {
    switch (error.code) {
      case 'auth/wrong-password':
        Alert.alert('Falha no login', 'Usuario ou senha invalidos');
        break;
      case 'auth/user-not-found':
        Alert.alert(
          'Falha no login',
          'Nenhum usuario encontrado esse endereço de email',
        );
        break;
      default:
        Alert.alert(
          'Falha no login',
          'Ocorreu um erro ao tentar fazer o login',
        );
    }
  }

  function getFacebookToken() {
    AccessToken.getCurrentAccessToken()
      .then((data) => {
        if (data) {
          const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken,
          );

          // Sign-in the user with the credential
          return auth()
            .signInWithCredential(facebookCredential)
            .then((value) => {
              if (value.user) {
                getTokenFirebase(value.user);
              }
            })
            .catch((err) => handleErrorLoginFirebase(err));
        }
      })
      .catch((err) => {
        Alert.alert('Erro ao logar com o facebook', err.message);
      });
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          return getFacebookToken();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }

  return (
    <S.PageDefault>
      <S.WrapperContent>
        <Image
          style={{
            width: 300,
            height: 150,
            alignSelf: 'center',
            marginTop: '-10%',
            marginBottom: '10%',
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
          <RaidsButtom textValue="Continuar" onPres={() => login()} />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <S.ContainerFacebookButtom
            onPress={() =>
              onFacebookButtonPress().then(() =>
                console.log('Signed in with Facebook!'),
              )
            }
          >
            <S.TextFacebookButtom>
              Logar com o Facebook
            </S.TextFacebookButtom>
          </S.ContainerFacebookButtom>
        </S.ComponentWrapper>

        <S.OptionsWrapper>
          <S.TextOptions>Esqueceu sua senha?</S.TextOptions>
        </S.OptionsWrapper>
        <S.OptionsWrapper>
          <S.TextOptions
            onPress={() => {
              props.navigation.navigate('Register');
            }}
          >
            Ainda não possui uma conta? Cadastre-se!
          </S.TextOptions>
        </S.OptionsWrapper>
      </S.WrapperContent>
    </S.PageDefault>
  );
}
