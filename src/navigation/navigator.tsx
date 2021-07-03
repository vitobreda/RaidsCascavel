import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StateContext } from '../commons/authContext'
import SignedIn from './signedIn';
import SignedOut from './signedOut';
import { navigationRef } from "./rootNavigation"

export default function Navigator() {
    const { state } = useContext(StateContext)

    return (
        <NavigationContainer ref={navigationRef}>
            {state ? <SignedIn /> : <SignedOut />}
        </NavigationContainer>
    );
}
