import React, { useState } from 'react';
import { Alert } from 'react-native';
import RaidsTextInput from '../Components/RaidsTextInput';
import RaidsButtom from '../Components/RaidsButtom';
import auth from '@react-native-firebase/auth';
import * as S from './styles';

export default function Register(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [gameName, setGameName] = useState();
  const [level, setLevel] = useState();
  const [team, setTeam] = useState();
  const [friendCode, setFriendCode] = useState();

  function registerNewUser() {
    if (!email) {
      Alert.alert(
        'Email não foi informado',
        'Informe um email valido para realizar o registro',
      );
    } else if (password != passwordConfirm) {
      Alert.alert(
        'Senha invalida',
        'As senhas informadas devem ser iguais',
      );
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user
            .sendEmailVerification()
            .then(() => console.log('email enviado com sucesso'))
            .catch((err) =>
              console.log(
                'ocorreu um erro ao enviar o email de verificação: ',
                err,
              ),
            );
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  }

  return (
    <S.PageDefault>
      <S.WrapperContent>
        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Email"
            textValue={email}
            onChangeText={(value) => setEmail(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Senha"
            textValue={password}
            onChangeText={(value) => setPassword(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Confirmar senha"
            textValue={passwordConfirm}
            onChangeText={(value) => setPasswordConfirm(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Nome no jogo"
            textValue={gameName}
            onChangeText={(value) => setGameName(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Nivel"
            textValue={level}
            onChangeText={(value) => setLevel(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Equipe"
            textValue={team}
            onChangeText={(value) => setTeam(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Código de amizade"
            textValue={friendCode}
            onChangeText={(value) => setFriendCode(value)}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <RaidsButtom
            textValue="Cadastrar"
            onPres={() => registerNewUser()}
          />
        </S.ComponentWrapper>
      </S.WrapperContent>
    </S.PageDefault>
  );
}
