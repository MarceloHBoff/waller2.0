import { FlatList } from 'react-native';

import styled, { css } from 'styled-components/native';

import { Colors, Fonts, Metrics } from '#styles';

import { UserActive } from '.';

export const Container = styled.View`
  width: 100%;
  height: 100%;
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
    Number(props.index) % 2 === 0 &&
    css`
      background: ${Colors.grayDarker};
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
