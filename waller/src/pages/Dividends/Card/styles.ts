import styled from 'styled-components/native';

import { Colors, Metrics, Fonts } from '#styles';

export const Container = styled.TouchableOpacity`
  flex: 1;
  max-height: 60px;
  margin: 16px 24px;
  padding: 10px;

  background: ${Colors.primarySuperDark};
  border-radius: ${Metrics.radius}px;

  justify-content: space-between;
  align-items: stretch;
  overflow: hidden;
`;

export const Wrapper = styled.View`
  flex: 1;
  background: ${Colors.primaryDark};
  border-radius: ${Metrics.radius}px;

  justify-content: center;
  align-items: center;
`;

export const CardText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.small}px;
  font-family: ${Fonts.robotoMedium};
`;
