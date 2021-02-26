import React from 'react'
import { Button } from "react-native";
import auth from '@react-native-firebase/auth';
import { LoginManager } from "react-native-fbsdk";

export default function Home() {
    return (
        <Button title="Logout" onPress={async () => {
            await LoginManager.logOut();
            auth().signOut().then(() => console.log('user are logout')).catch((err) => console.log('some wrong happens when user are logedout'))
        }} />
    )
}