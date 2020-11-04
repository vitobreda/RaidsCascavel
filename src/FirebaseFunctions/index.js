import React from 'react';
import auth from '@react-native-firebase/auth';
import { StateContext } from '../Context';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { customMessage } from '../Functions';
import { Alert } from 'react-native';

function alertVerificarEmail(authUser) {
  return Alert.alert(
    'Cadastro incompleto',
    'É necessario verificar o email para continuar',
    [
      {
        text: 'Ok',
        style: 'Ok',
      },
      {
        text: 'Enviar novo email',
        onPress: () => authUser.sendEmailVerification(),
      },
    ],
    { cancelable: false },
  );
}

export function getTokenFirebase(authUser) {
  if (!authUser.emailVerified) {
    alertVerificarEmail(authUser);
    auth().signOut();
  } else {
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
        setButtonActivityIndicator(false);
        customMessage('Falha ao solicitar o token', err.message);
      });
  }
}

export function login() {
  setButtonActivityIndicator(true);
  if (!user) {
    setButtonActivityIndicator(false);
    customMessage(
      'Informações incompletas',
      'Não foi informado um usuario',
    );
  } else if (!password) {
    setButtonActivityIndicator(false);
    customMessage(
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

export function handleErrorLoginFirebase(error) {
  setButtonActivityIndicator(false);
  switch (error.code) {
    case 'auth/wrong-password':
      customMessage('Falha no login', 'Usuario ou senha invalidos');
      break;
    case 'auth/user-not-found':
      customMessage(
        'Falha no login',
        'Nenhum usuario encontrado esse endereço de email',
      );
      break;
    default:
      customMessage(
        'Falha no login',
        'Ocorreu um erro ao tentar fazer o login',
      );
  }
}

export function getFacebookToken() {
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
          .catch((err) => {
            setButtonActivityIndicator(false);
            handleErrorLoginFirebase(err);
          });
      }
    })
    .catch((err) => {
      setButtonActivityIndicator(false);
      customMessage('Erro ao logar com o facebook', err.message);
    });
}

export function registerNewUser() {
  if (!email) {
    customMessage(
      'Email não foi informado',
      'Informe um email valido para realizar o registro',
    );
  } else if (password != passwordConfirm) {
    customMessage(
      'Senha invalida',
      'As senhas informadas devem ser iguais',
    );
  } else {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user
          .sendEmailVerification()
          .then(() =>
            customMessage(
              'Email enviado',
              'Email para confirmacao enviado com sucesso',
            ),
          )
          .catch((err) =>
            customMessage(
              'Email de confirmaçao',
              'Ocorreu um erro ao enviar o email de confirmação',
            ),
          );
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          customMessage(
            'Email já cadastrado',
            'Esse email ja está cadastrado tente outro email',
          );
        }

        if (error.code === 'auth/invalid-email') {
          customMessage(
            'Email invalido',
            'O email informado não é valido, informe um email valido',
          );
        }

        console.error(error);
      });
  }
}
