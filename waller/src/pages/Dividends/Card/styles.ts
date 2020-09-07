import { Animated } from 'react-native';

import styled from 'styled-components/native';

import ValueField from '#components/ValueField';
import { Colors, Metrics, Fonts } from '#styles';

export const Container = styled(Animated.View)`
  flex: 1;
  max-height: 80px;
  margin: 16px 24px;
  padding: 10px;

  background: ${Colors.primary};
  border-radius: ${Metrics.radius}px;
`;

export const Wrapper = styled.TouchableOpacity`
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const CardText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.small}px;
  font-family: ${Fonts.robotoMedium};
`;

export const CardValue = styled(ValueField)`
  text-align: center;
`;
