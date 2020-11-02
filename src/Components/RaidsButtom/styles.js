import styled from 'styled-components/native';
import * as Default from '../../styles';

export const Colors = Default.DefaultColors;

export const ContainerButtom = styled.TouchableOpacity`
  height: 48px;
  background-color: ${Colors.ButtomColor};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const TextButtom = styled.Text`
  font-size: 16px;
  font-family: Roboto-Bold;
  color: ${Colors.TextButtomColor};
  text-transform: capitalize;
`;
