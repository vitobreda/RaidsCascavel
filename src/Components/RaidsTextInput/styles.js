import styled from 'styled-components/native';
import * as Default from '../../styles'

export const Colors = Default.DefaultColors;

export const TextInput = styled.TextInput`
    background-color: ${Colors.InputBackgroundColor};
    color: ${Colors.InputFontColor};
    font-family: Roboto;
    font-size: 16px;
    border-width: 1px;
    border-color: ${Colors.InputBorderColor};
    border-radius: 10px;
    padding-left: 20px;     
`;