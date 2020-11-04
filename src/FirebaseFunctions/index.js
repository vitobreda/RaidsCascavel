import React from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { customMessage } from '../Functions';
import { Alert } from 'react-native';

export function alertVerifyEmail(authUser) {
  return Alert.alert(
    'Cadastro incompleto',
    'Verifique seu email para completar o cadastro',
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

export function login(email, password) {
  if (!email) {
    customMessage(
      'Informações incompletas',
      'Não foi informado um usuario',
    );
  } else if (!password) {
    customMessage(
      'Informações incompletas',
      'Não foi informado uma senha',
    );
  } else {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        if (!success.user.emailVerified) {
          alertVerifyEmail(success.user);
        }
      })
      .catch((err) => {
        handleErrorLoginFirebase(err);
      });
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
        auth()
          .signInWithCredential(facebookCredential)
          .catch((err) => {
            handleErrorLoginFirebase(err);
          });
      }
    })
    .catch((err) => {
      customMessage('Erro ao logar com o facebook: ', err.message);
    });
}

export async function onFacebookButtonPress() {
  LoginManager.logInWithPermissions(['public_profile']).then(
    function (result) {
      if (!result.isCancelled) {
        getFacebookToken();
      }
    },
    function (err) {
      console.log('Erro ao logar com o facebook: ' + err.message);
    },
  );
}

export function registerNewUser(email, password, passwordConfirm) {
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
      })
      .catch((err) => {
        handleErrorLoginFirebase(err);
      });
  }
}

export function handleErrorLoginFirebase(error) {
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
    case 'auth/email-already-in-use':
      customMessage(
        'Email já cadastrado',
        'Esse email ja está cadastrado tente outro email',
      );
      break;
    case 'auth/invalid-email':
      customMessage(
        'Email invalido',
        'O email informado não é valido, informe um email valido',
      );
      break;
    default:
      customMessage(
        'Erro desconhecido',
        'Error code: ' +
          error.code +
          ' erro message: ' +
          error.message,
      );
  }
}
