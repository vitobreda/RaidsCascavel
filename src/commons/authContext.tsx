import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const userInitialState = {
    name: '',
    token: ''
};

export const StateContext = React.createContext({
    user: userInitialState,
});


export function AuthContext(props: any) {
    const [user, setUser] = useState(userInitialState);

    console.log('context are executed')

    useEffect(() => {
        auth().onAuthStateChanged((authUser) => {
            console.log('auth state changed are executed')
            if (authUser) {
                console.log('usuario: ', authUser);
                authUser
                    .getIdToken()
                    .then((token) => {
                        console.log('token: ', token);
                        setUser({ name: '', token: token })
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