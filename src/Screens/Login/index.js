import React, { useState } from 'react';
import RaidsTextInput from '../../Components/RaidsTextInput';
import RaidsButtom from '../../Components/RaidsButtom';
import * as Firebase from '../../Commons/Firebase';
import * as S from './styles';

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [
    buttonActivityIndicator,
    setButtonActivityIndicator,
  ] = useState(false);

  return (
    <S.PageDefault>
      <S.WrapperContent>
        <S.Image source={require('../../Assets/Logo.png')} />
        <S.ComponentWrapper>
          <RaidsTextInput
            placeholder="Email"
            textValue={email}
            onChangeText={(value) => setEmail(value)}
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
            onPres={() => {
              Firebase.login(email, password);
            }}
            showActivityIndicator={buttonActivityIndicator}
          />
        </S.ComponentWrapper>

        <S.ComponentWrapper>
          <S.ContainerFacebookButtom
            onPress={async () => {
              setButtonActivityIndicator(true);

              await Firebase.onFacebookButtonPress().then((result) =>
                setButtonActivityIndicator(!result.isCancelled),
              );
            }}
          >
            <S.TextFacebookButtom>
              Logar com o Facebook
            </S.TextFacebookButtom>
          </S.ContainerFacebookButtom>
        </S.ComponentWrapper>

        <S.OptionsWrapper
          onPress={() => {
            Firebase.recoveryPassword(email);
          }}
        >
          <S.TextOptions>Esqueceu sua senha?</S.TextOptions>
        </S.OptionsWrapper>
        <S.OptionsWrapper
          onPress={() => {
            props.navigation.navigate('Register');
          }}
        >
          <S.TextOptions>
            Ainda não possui uma conta? Cadastre-se!
          </S.TextOptions>
        </S.OptionsWrapper>
      </S.WrapperContent>
    </S.PageDefault>
  );
}
