import styled from 'styled-components/native';
import * as Default from '../../styles'

export const Colors = Default.DefaultColors;

export const TextInput = styled.TextInput`
    background-color: ${Colors.InputBackgroundColor};
    color: ${Colors.InputFontColor};
    font-family: Roboto;
    font-size: 16;
    border-width: 1;
    border-color: ${Colors.InputBorderColor};
    border-radius: 10; 
`;