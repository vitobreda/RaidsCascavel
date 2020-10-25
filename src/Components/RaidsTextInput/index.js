import React from 'react';
import * as S from './styles';

export default function RaidsTextInput({ 
    textValue, 
    styles, 
    onChangeText, 
    placeholder, 
    placeholderTextColor,
    secureTextEntry,
}) 
{
    return (
        <S.TextInput
            style={{...styles}}
            TextValue={textValue}
            onChangeText={onChangeText}            
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor ? placeholderTextColor : S.Colors.InputFontColor }
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
        ></S.TextInput>
    )
}