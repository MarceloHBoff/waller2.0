import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '#styles';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
`;

export const HeaderText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.big}px;
  font-family: ${Fonts.poppinsMedium};
`;

export const Types = styled.View`
  height: ${Metrics.base * 4}px;
  background: ${Colors.grayDark};
  border-radius: ${Metrics.radius * 2}px;

  margin: 0 ${Metrics.base}px;
  margin-top: ${Metrics.base}px;
  padding: ${Metrics.base}px;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Type = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.small}px;
  font-family: ${Fonts.poppinsMedium};
  padding: ${Metrics.base}px;
`;
