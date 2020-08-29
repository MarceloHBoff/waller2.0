import { Animated } from 'react-native';

import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '#styles';

export const Container = styled.View`
  flex: 1;
`;

export const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Configurations = styled(Animated.View)``;

export const Configuration = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SignOut = styled(Animated.View)`
  background: ${Colors.primary};
  padding: ${Metrics.base / 2}px;
  margin: ${Metrics.base}px;
  border-radius: ${Metrics.radius}px;

  justify-content: center;
  align-items: center;
`;

export const SignOutText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.big}px;
  font-family: ${Fonts.poppinsMedium};
`;
