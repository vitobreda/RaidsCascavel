import React from 'react';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Alert } from 'react-native';

// Method used when press login facebook button
export async function onFacebookButtonPress() {
  function getFacebookToken() {
    AccessToken.getCurrentAccessToken().then((data) => {
      if (data) {
        const facebookCredential = auth.FacebookAuthProvider.credential(
          data.accessToken,
        );

        // Sign-in the user with the credential
        auth().signInWithCredential(facebookCredential);
      }
    });
  }

  return LoginManager.logInWithPermissions(['public_profile'])
    .then((result) => {
      if (!result.isCancelled) {
        getFacebookToken();
      }
      return result;
    })
    .catch(alert);
}

//Default Login method
export function login(email, password) {
  function alertVerifyEmail(authUser) {
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

  if (!email) {
    alert('Informações incompletas', 'Não foi informado um usuario');
  } else if (!password) {
    alert('Informações incompletas', 'Não foi informado uma senha');
  } else {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((success) => {
        if (!success.user.emailVerified) {
          alertVerifyEmail(success.user);
        }
      })
      .catch(alert);
  }
}

export function registerNewUser(email, password, passwordConfirm) {
  if (!email) {
    alert(
      'Email não foi informado',
      'Informe um email valido para realizar o registro',
    );
  } else if (password != passwordConfirm) {
    alert('Senha invalida', 'As senhas informadas devem ser iguais');
  } else {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user
          .sendEmailVerification()
          .then(() =>
            alert(
              'Email enviado',
              'Email para confirmacao enviado com sucesso',
            ),
          );
      })
      .catch(alert);
  }
}

export function recoveryPassword(email) {
  if (!email) {
    alert('informe um email valido!!');
  } else {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          'Enviado o email para recuperacão de senha, caso o email não chegar dentre alguns minutos verifique a lixeira antes de realizar uma nova tentativa',
        );
      })
      .catch(alert);
  }
}
