import { Text, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #394053;
    padding-top: 40px;
`;

export const InputView = styled(View)`
    width: ${Dimensions.get('window').width * 0.8}px;
    background-color: #646464;
    border-radius: 20px;
    height: 50px;
    margin-bottom: 20px;
    justify-content: center;
    padding: 20px;
`;

export const InputText = styled(TextInput)`
    height: 50px;
    color: white;
`;

export const Button = styled(TouchableOpacity)`
    width: ${Dimensions.get('window').width * 0.8}px;
    background-color: #7CAE7A;
    border-radius: 20px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 10px;
`;

export const ButtonText = styled(Text)`
    color: white;
`;