import React, { useState } from 'react'
import { Button, TextInput } from "react-native"
import { onFacebookButtonPress } from "../commons/facebookLogin";
import * as Styles from '../styles/login'


export default function Login() {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    return (
        <Styles.Container>
            <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Email"
            />

            <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Senha"
            />

            <Button
                title="Login"
                onPress={() => console.log('login')}
            />


            <Button
                title="Facebook Sign-In"
                onPress={() =>
                    onFacebookButtonPress()
                        .then((data) => console.log("Signed in with Facebook!"))
                        .catch((error) => {
                            console.log("ocorreu um erro ao tentar fazer login: ", error);
                        })
                }
            />
        </Styles.Container>
    );
}