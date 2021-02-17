import React from 'react'
import { Button } from "react-native";
import auth from '@react-native-firebase/auth';


export default function Home() {
    return (
        <Button title="Logout" onPress={() => auth().signOut().then(() => console.log('user are logout')).catch((err) => console.log('some wrong happens when user are logedout'))} />
    )
}