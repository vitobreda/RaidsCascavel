import React from 'react';
import * as S from './styles';

export default function RaidsButtom({
    containerStyle,
    textStyle,
    textValue,
    onPres,
}) {
    return (
        <S.ContainerButtom 
            style={{ ...containerStyle }}
            onPress={onPres}
        >
            <S.TextButtom style={{ ...textStyle }} >{textValue}</S.TextButtom>
        </S.ContainerButtom>
    )
}