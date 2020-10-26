import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

const space = width < 430 ? 5 : 8;

export const metrics = {
  cardPadding: 10,
  cardBorderRadius: space,
  cardMargin: space,
  width,
  height,
};

export const DefaultColors = {
  //Default Colors
  backgroundColor: '#101010',

  //Input Colors
  InputBorderColor: '#34725b',
  InputBackgroundColor: "#333333",
  InputFontColor: "#C0C0C0",
  
  //Buttom Colors
  ButtomColor: "#34725b",
  TextButtomColor: "#F0F0F0",
}

export const PageDefault = styled.View`
  flex: 1;
  padding: 0;
  margin: 0;
  background-color: #101010;
`;

export const ContainerFacebookButtom = styled.TouchableOpacity`
  height: 48px;
  background-color: #FFFFFF;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const TextFacebookButtom = styled.Text`
  font-size: 16px;
  font-family: Roboto-Bold;
  color: #303030;  
`;


