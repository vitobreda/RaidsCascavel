import React, { useState, useContext } from 'react';
import { Alert, Image } from 'react-native';
import RaidsTextInput from '../Components/RaidsTextInput';
import RaidsButtom from '../Components/RaidsButtom';
import { StateContext } from '../Context';
import * as Firebase from '../FirebaseFunctions';
import * as S from './styles';

export default function Login(props) {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const [
    buttonActivityIndicator,
    setButtonActivityIndicator,
  ] = useState(false);
  const { state, actions } = useContext(StateContext);

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
          <RaidsButtom
            textValue="Continuar"
            onPres={() => Firebase.login(user, password)}
            showActivityIndicator={buttonActivityIndicator}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <S.ContainerFacebookButtom
            onPress={() => Firebase.onFacebookButtonPress()}
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
