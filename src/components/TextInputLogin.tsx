import React from 'react'
import { TextInput } from 'react-native-paper';
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

function TextInputLogin(props: Partial<TextInputProps>) {
    return (
        <TextInput
            style={{
                marginBottom: 20,
                backgroundColor: "transparent",
                marginLeft: 20,
                marginRight: 20,
            }}
            label="Email"
            theme={{ colors: { primary: "white", text: "green", placeholder: "pink" } }}
            underlineColor="white"
            selectionColor="white"
            {...props}
        />
    )
}

export default TextInputLogin;