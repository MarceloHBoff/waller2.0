import { FlatList } from 'react-native';

import styled from 'styled-components/native';

import { Metrics, Colors } from '#styles';
import { IDividend } from '#types/Dividends';

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  height: ${Metrics.height - Metrics.base * 14}px;
  width: ${Metrics.width - Metrics.base * 4}px;
  border-radius: ${Metrics.radius}px;
  padding: ${Metrics.base}px 0;

  background: ${Colors.grayDark};
`;

export const List = styled(FlatList as new () => FlatList<IDividend>)``;

export const Dividend = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${Metrics.base / 2}px ${Metrics.base}px;

  border-bottom-width: 1px;
  border-bottom-color: ${Colors.grayDarker};
`;

export const Text = styled.Text`
  text-align: right;
  color: ${Colors.white};
`;
