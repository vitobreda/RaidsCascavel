import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import RaidsTextInput from '../Components/RaidsTextInput';
import RaidsButtom from '../Components/RaidsButtom';
import * as FirebaseFunctions from '../FirebaseFunctions';
import * as S from './styles';

export default function Register(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [gameName, setGameName] = useState();
  const [level, setLevel] = useState();
  const [team, setTeam] = useState();
  const [friendCode, setFriendCode] = useState();

  //TODO add next function to keyboard
  return (
    <S.PageDefault>
      <ScrollView>
        <S.WrapperContent
          enabled={false}
          behavior={Platform.select({
            ios: 'padding',
            android: null,
          })}
        >
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
              onPres={() =>
                FirebaseFunctions.registerNewUser(
                  email,
                  password,
                  passwordConfirm,
                )
              }
            />
          </S.ComponentWrapper>
        </S.WrapperContent>
      </ScrollView>
    </S.PageDefault>
  );
}
