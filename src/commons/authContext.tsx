import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import * as RootNavigation from '../navigation/rootNavigation';
import axios from 'axios';

const userInitialState = {
    email: '',
    token: ''
};

export const StateContext = React.createContext({
    user: userInitialState,
});


export function AuthContext(props: any) {
    const [user, setUser] = useState(userInitialState);

    useEffect(() => {
        auth().onAuthStateChanged((authUser) => {
            console.log('auth state changed are executed')
            console.log(authUser)
            if (authUser) {
                authUser
                    .getIdToken()
                    .then((token) => {
                        let data = {
                            firebaseToken: token
                        }

                        console.log('firebase token: ', token)

                        axios.post("http://192.168.1.11:3000/users/firebaseAuthenticate", JSON.stringify(data), {
                            headers: { "Content-Type": 'application/json' }
                        }
                        )
                            .then((response: any) => {
                                setUser({ email: response.data.email, token: response.data.accessToken })
                            }).catch((error) => {
                                if (error.response.status === 403) {
                                    RootNavigation?.navigate('FacebookRegister', { email: authUser.email });
                                }
                                console.log(error.response.status);
                            });
                    })
                    .catch((err) => {
                        console.log('ocorreu um erro ao tentar solicitar o token: ', err)
                        setUser(userInitialState)
                    });
            } else {
                console.log('authUser are not defined so user go back to initial state')
                setUser(userInitialState)
            }
        });
    }, [])


    return (
        <StateContext.Provider value={{ user }}>
            {props.children}
        </StateContext.Provider>
    );
};