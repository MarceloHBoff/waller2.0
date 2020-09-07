import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '#styles';

export const Container = styled.View`
  border-radius: ${Metrics.radius}px;
  background: ${Colors.primary};
  border-color: ${Colors.primarySuperDark};
  border-width: 2px;

  margin: 0 ${Metrics.base}px;
  padding: ${Metrics.base}px;

  height: 100px;
  width: 260px;

  align-items: center;
  flex-direction: row;
`;

export const CardText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.big}px;
  font-family: ${Fonts.poppinsMedium};
`;

export const CardWrapper = styled.View`
  margin-left: ${Metrics.base}px;
  align-items: flex-start;
`;
