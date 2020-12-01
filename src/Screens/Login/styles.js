import styled from 'styled-components/native';
import * as Default from '../../styles';

export const PageDefault = styled(Default.PageDefault)``;

export const ContainerFacebookButtom = styled(
  Default.ContainerFacebookButtom,
)``;

export const Image = styled.Image`
  width: 300px;
  height: 150px;
  align-self: center;
  margin-top: -10%;
  margin-bottom: 10%;
`;

export const TextFacebookButtom = styled(
  Default.TextFacebookButtom,
)``;

export const WrapperContent = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
  background-color: transparent;
`;

export const ComponentWrapper = styled.View`
  align-content: center;
  margin: 10px 20px 10px 20px;
  justify-content: center;
  background-color: transparent;
`;

export const TextOptions = styled.Text`
  color: ${Default.DefaultColors.TextButtomColor};
  font-family: Roboto;
`;

export const OptionsWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;
