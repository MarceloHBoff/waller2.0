import { Animated } from 'react-native';

import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../styles';

export const Container = styled(Animated.View)`
  flex: 1;
`;

export const Content = styled.View`
  padding: 0 ${Metrics.big}px;
  margin-bottom: ${Metrics.large}px;
`;

export const TitleImage = styled.Image`
  margin-top: ${Metrics.base}px;
  margin-left: auto;
  height: 180px;
`;

export const Title = styled.Text`
  font-size: ${Fonts.superBig}px;
  font-family: ${Fonts.poppinsMedium};
  color: ${Colors.white};
  margin-bottom: ${Metrics.big}px;
`;

export const SubmitButton = styled.TouchableOpacity`
  padding: ${Metrics.base}px;
  width: 70%;
  margin-left: auto;
  margin-top: auto;
  background: ${Colors.primaryDark};
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;

  justify-content: center;
  align-items: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: ${Fonts.big}px;
  font-family: ${Fonts.poppinsMedium};
  color: ${Colors.white};
`;
