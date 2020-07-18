import styled from 'styled-components/native';

import { Colors, Metrics } from '#styles';

export const Container = styled.View`
  height: 80px;
  border-bottom-left-radius: ${Metrics.radius * 2}px;
  border-bottom-right-radius: ${Metrics.radius * 2}px;
  background: ${Colors.primarySuperDark};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${Metrics.base}px;
  margin-bottom: ${Metrics.base}px;
`;
