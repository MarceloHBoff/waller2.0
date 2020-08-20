import styled from 'styled-components/native';

import { Colors, Metrics } from '#styles';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
`;

export const Cards = styled.ScrollView`
  max-height: ${Metrics.base * 2 + 100}px;
`;
