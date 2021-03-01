import React, { useState } from 'react'
import { TouchableOpacity } from "react-native"
import { onFacebookButtonPress } from "../commons/facebookLogin";
import auth from "@react-native-firebase/auth";
import * as Styles from '../styles/loginStyle'
import Navigation from '../navigation/signedIn';


export default function Login(props: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
                auth().signInWithEmailAndPassword(email, password).then(() => {
                    console.log('signed in with email and password')
                }).catch((error) => { console.log('something wrong when try to login with email and password: ', error) })
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



            <TouchableOpacity onPress={() => {
                props.navigation.navigate('Register')
            }}>
                <Styles.LoginText>Cadastrar</Styles.LoginText>
            </TouchableOpacity>

        </Styles.Container>
    );
}