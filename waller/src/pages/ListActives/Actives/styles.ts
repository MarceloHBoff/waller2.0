import { FlatList } from 'react-native';

import styled, { css } from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../../styles';

import { UserActive } from '.';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDark};
`;

export const ActivesContainer = styled(
  FlatList as new () => FlatList<UserActive>,
)`
  background: ${Colors.grayDark};
`;

interface IActive {
  index?: number;
}

export const Active = styled.View<IActive>`
  flex-direction: row;
  width: 100%;
  padding: 0 ${Metrics.base / 2}px;

  ${props =>
    props.index !== 0 &&
    css`
      border-top-width: 0.5px;
      border-color: ${Colors.graySuperLight};
    `}
`;

export const ActiveText = styled.Text`
  width: 20%;
  padding: ${Metrics.base / 2}px;
  color: ${Colors.white};
  font-size: ${Fonts.superSmall}px;
  font-family: ${Fonts.poppinsMedium};
  text-align: right;
`;
