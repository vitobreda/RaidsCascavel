import React, { useState } from 'react'
import { Button, TouchableOpacity } from "react-native"
import { onFacebookButtonPress } from "../commons/facebookLogin";
import * as Styles from '../styles/login'


export default function Login() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

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
                fetch("http://192.168.1.10:3000/auth/facebook").then((value) => console.log('request succes', value)).catch((error) => { console.log('some error happerns: ', error) })
            }}>
                <Styles.LoginText>Entrar</Styles.LoginText>
            </Styles.LoginBtn>

            <Styles.FacebookBtn onPress={() => onFacebookButtonPress()
                .then((data) => console.log("Signed in with Facebook!"))
                .catch((error) => {
                    console.log("ocorreu um erro ao tentar fazer login: ", error);
                })}>
                <Styles.LoginText>Facebook</Styles.LoginText>
            </Styles.FacebookBtn>



            <TouchableOpacity>
                <Styles.LoginText>Cadastrar</Styles.LoginText>
            </TouchableOpacity>

        </Styles.Container>
    );
}