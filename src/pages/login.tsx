import React, { useContext, useState } from 'react'
import { TouchableOpacity, Alert } from "react-native"
import * as Styles from '../styles/loginStyle'
import { StateContext } from '../commons/authContext'


export default function Login(props: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { facebookLogin, login } = useContext(StateContext)

    return (
        <Styles.Container>
            <Styles.Logo>Raids Cascavel</Styles.Logo>
            <Styles.InputView>
                <Styles.InputText
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email..."
                />
            </Styles.InputView>

            <Styles.InputView>
                <Styles.InputText
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Senha..."
                />
            </Styles.InputView>

            <TouchableOpacity>
                <Styles.Forgot>Esqueceu a senha?</Styles.Forgot>
            </TouchableOpacity>

            <Styles.LoginBtn onPress={() => {
                login(email, password);
            }}>
                <Styles.LoginText>Entrar</Styles.LoginText>
            </Styles.LoginBtn>

            <Styles.FacebookBtn onPress={() => facebookLogin()}>
                <Styles.LoginText>Facebook</Styles.LoginText>
            </Styles.FacebookBtn>

            <TouchableOpacity onPress={() => {
                props.navigation.navigate('Register')
            }}>
                <Styles.LoginText>Cadastrar</Styles.LoginText>
            </TouchableOpacity>

        </Styles.Container>
    );
}