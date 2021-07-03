import React, { useContext } from 'react'
import { Button } from "react-native";
import { StateContext } from '../commons/authContext'

export default function Home() {
    const { functions } = useContext(StateContext)

    return (
        <Button title="Logout" onPress={async () => {
            functions?.logOut();
        }} />
    )
}