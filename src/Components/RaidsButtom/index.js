import React from 'react';
import { ActivityIndicator } from 'react-native';
import * as S from './styles';

export default function RaidsButtom({
  containerStyle,
  textStyle,
  textValue,
  onPres,
  showActivityIndicator,
}) {
  return (
    <S.ContainerButtom style={{ ...containerStyle }} onPress={onPres}>
      {showActivityIndicator ? (
        <ActivityIndicator
          size={'large'}
          color={S.Colors.TextButtomColor}
        />
      ) : (
        <S.TextButtom style={{ ...textStyle }}>
          {textValue}
        </S.TextButtom>
      )}
    </S.ContainerButtom>
  );
}
