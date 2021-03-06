import React, { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Alert } from 'react-native'
import * as RootNavigation from '../navigation/rootNavigation';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import axios from 'axios';
import { constants } from './constants';

interface IState {
    email: string;
    token: string;
}

interface IFunctions {
    loginApi: (firebaseToken: string) => void,
    facebookLogin: () => void,
    login: (email: string, password: string) => void,
    logOut: () => void
}

interface IContext {
    state: IState | undefined,
    functions: IFunctions
}

export const StateContext = React.createContext<Partial<IContext>>({});


export function AuthContext(props: any) {
    const [user, setUser] = useState<IState>();

    useEffect(() => {
        // removed onAuthStateChanged to prevent unexpected loop
        try {
            auth().onAuthStateChanged
            const user = auth().currentUser;
    
            if (user) {
                getFirebaseToken(user)
            }
        } catch(e) {
            console.log('print error: ', e)
        }
    }, [])

    function handlerErrorLogin(error: any) {
        switch (error.code) {
            case 'auth/user-not-found':
                Alert.alert('Usuário não encontrado!', 'Não existe cadastro para o usuário informado!');
                break;
            case 'auth/wrong-password':
                Alert.alert('Senha inválida!', 'A senha informada não corresponde ao usuário!');
                break;
            case 'ECONNABORTED':
                Alert.alert('Tempo limite excedido!', 'O servidor não respondeu no tempo específicado, tente novamente mais tarde!');
                break;
            default:
                Alert.alert('Ocorreu um erro!', error.message);
        }
    }

    function getFirebaseToken(authUser: FirebaseAuthTypes.User) {
        if (authUser) {
            authUser
                .getIdToken()
                .then((token) => {
                    loginApi(token)
                        .then((response: any) => setUser({ email: response.data.email, token: response.data.accessToken }))
                        .catch((error) => {
                            if (error.response != undefined && error.response.status === 403) {
                                RootNavigation?.navigate('FacebookRegister', { email: authUser.email, firebaseId: authUser.uid, firebaseToken: token });
                            } else {
                                handlerErrorLogin(error)
                            }
                        })
                })
                .catch((err) => {
                    handlerErrorLogin(err)
                    setUser(undefined)
                });
        } else {
            setUser(undefined)
        }
    }

    async function facebookLogin() {
        const result = await LoginManager.logInWithPermissions([
            "public_profile",
            "email",
        ]);

        if (result.isCancelled) {
            throw "User cancelled the login process";
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        console.log('facebook access token: ', data)
        if (!data) {
            throw "Something went wrong obtaining access token";
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(
            data.accessToken
        );

        // Sign-in the user with the credential
        auth().signInWithCredential(facebookCredential)
            .then((authUser) => getFirebaseToken(authUser.user))
            .catch((error) => handlerErrorLogin(error))
    }

    function login(email: string, password: string) {
        auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log('signed in with email and password')
        }).catch((error) => handlerErrorLogin(error))
    }

    async function logOut() {
        await LoginManager.logOut();
        auth().signOut()
            .then(() => setUser(undefined))
            .catch((err) => Alert.alert('Ocorreu um erro', err.message))
    }

    function loginApi(firebaseToken: string) {
        return new Promise((resolve, reject) => {
            let data = {
                firebaseToken: firebaseToken
            }

            axios.post(constants.services.FIREBASE_AUTHENTICATE, JSON.stringify(data), {
                headers: { "Content-Type": 'application/json' },
                timeout: 10000
            })
                .then((response: any) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error);
                });
        })

    }

    return (
        <StateContext.Provider value={{
            state: user,
            functions: {
                loginApi: loginApi,
                facebookLogin: facebookLogin,
                login: login,
                logOut: logOut 
            }
        }}>
            {props.children}
        </StateContext.Provider>
    );
};