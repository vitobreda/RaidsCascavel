import React, { useContext, useState } from 'react'
import { TouchableOpacity, StyleSheet } from "react-native"
import * as Styles from '../styles/loginStyle'
import { StateContext } from '../commons/authContext'
import { Button, TextInput } from 'react-native-paper';


export default function Login(props: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { functions } = useContext(StateContext)

    return (
        <Styles.Container>
            <Styles.Logo>Raids Cascavel</Styles.Logo>
            <TextInput
                style={{
                    marginBottom: 20,
                    backgroundColor: "transparent",
                    marginLeft: 20,
                    marginRight: 20,
                }}
                label="Email"
                theme={{ colors: { primary: "white", text: "red", placeholder: "yellow" } }}
                underlineColor="white"
                selectionColor="white"
                placeholderTextColor="white"
                placeholder="Digite seu email..."
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <TextInput
                label="password"
                placeholder="Senha..."
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />


            <Button style={styles.button} icon="login" mode="contained" onPress={() => functions?.login(email, password)}>
                Entrar
            </Button>

            <Button style={styles.button} icon="facebook" mode="contained" onPress={() => functions?.facebookLogin()}>
                Facebook
            </Button>

            <TouchableOpacity>
                <Styles.Forgot>Esqueceu a senha?</Styles.Forgot>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                props.navigation.navigate('Register')
            }}>
                <Styles.LoginText>Cadastrar</Styles.LoginText>
            </TouchableOpacity>

        </Styles.Container>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "70%",
        height: 50,
        justifyContent: "center",
        marginBottom: 20
    }
})