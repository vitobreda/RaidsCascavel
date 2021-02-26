import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: #394053;
`;

export const Logo = styled(Text)`
    font-weight: bold;
    font-size: 40px;
    color: #7CAE7A;
    margin-bottom: 40px;
`;


export const InputView = styled(View)`
    width: 80%;
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

export const Forgot = styled(Text)`
    color: white;
    font-size: 11;
`;

export const LoginBtn = styled(TouchableOpacity)`
    width: 80%;
    background-color: #7CAE7A;
    border-radius: 20px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 40;
    margin-bottom: 10;
`;

export const FacebookBtn = styled(TouchableOpacity)`
    width: 80%;
    background-color: #3b5998;
    border-radius: 20px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const LoginText = styled(Text)`
    color: white;
`;