import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StateContext } from '../commons/authContext'
import SignedIn from './signedIn';
import SignedOut from './signedOut';
import { State } from 'react-native-gesture-handler';

export default function Navigator() {
    const { user } = useContext(StateContext)

    return (
        <NavigationContainer>
            {user.token !== '' ? <SignedIn /> : <SignedOut />}
        </NavigationContainer>
    );
}
