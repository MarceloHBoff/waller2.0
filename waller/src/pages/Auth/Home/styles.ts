import { Animated } from 'react-native';

import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../../styles';

export const Container = styled.View`
  flex: 1;
  padding: ${Metrics.large}px 0;

  justify-content: space-between;
`;

export const HomeImage = styled(Animated.Image)``;

export const ButtonsContainer = styled.View``;

const Button = styled.TouchableOpacity`
  padding: ${Metrics.base}px;
  width: 80%;
`;

const ButtonText = styled.Text`
  font-size: ${Fonts.big}px;
  font-family: ${Fonts.poppinsMedium};
  color: ${Colors.white};
`;

export const SignInButtonContainer = styled(Animated.View)`
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

export const SignInButton = styled(Button)`
  background: ${Colors.primaryLight};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
`;

export const SignInButtonText = styled(ButtonText)`
  margin-left: 72px;
`;

export const SignUpButtonContainer = styled(Animated.View)`
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

export const SignUpButton = styled(Button)`
  background: ${Colors.primaryDark};
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;

  margin-top: ${Metrics.big}px;
`;

export const SignUpButtonText = styled(ButtonText)`
  margin-left: auto;
  margin-right: 72px;
`;
