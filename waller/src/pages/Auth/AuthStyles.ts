import { Animated } from 'react-native';

import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../styles';

export const Container = styled(Animated.View)`
  flex: 1;
`;

export const Content = styled(Animated.View)`
  padding: 0 ${Metrics.big}px;
  margin-bottom: ${Metrics.large}px;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  left: 20px;
`;

export const TitleImage = styled(Animated.Image)`
  margin-top: ${Metrics.base}px;
  margin-left: auto;
  height: 180px;
`;

export const Title = styled(Animated.Text)`
  font-size: ${Fonts.superBig}px;
  font-family: ${Fonts.poppinsMedium};
  color: ${Colors.white};
  margin-bottom: ${Metrics.big}px;
`;

export const SubmitButtonContainer = styled(Animated.View)``;

export const SubmitButton = styled.TouchableOpacity`
  padding: ${Metrics.base}px;
  width: 70%;
  margin-left: auto;
  margin-top: auto;
  background: ${Colors.primaryDark};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;

  justify-content: center;
  flex-direction: row;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: ${Fonts.big}px;
  font-family: ${Fonts.poppinsMedium};
  color: ${Colors.white};
  margin-right: ${Metrics.base}px;
`;
