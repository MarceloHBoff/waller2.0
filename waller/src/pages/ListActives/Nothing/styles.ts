import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../../styles';

export const Container = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  padding: ${Metrics.base}px;
`;

export const NothingText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.regular}px;
  font-family: ${Fonts.poppinsMedium};
  margin: ${Metrics.base}px;
`;
