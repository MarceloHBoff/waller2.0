import { FlatList } from 'react-native';

import styled, { css } from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../../styles';

import { UserBond } from '.';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDark};
`;

export const BondsContainer = styled(FlatList as new () => FlatList<UserBond>)`
  background: ${Colors.grayDark};
`;

interface IBond {
  index?: number;
}

export const Bond = styled.View<IBond>`
  flex-direction: row;
  width: 100%;
  padding: 0 ${Metrics.base / 2}px;

  ${props =>
    Number(props.index) % 2 === 0 &&
    css`
      background: ${Colors.grayDarker};
    `}
`;

export const BondText = styled.Text`
  width: 20%;
  padding: ${Metrics.base / 2}px;
  color: ${Colors.white};
  font-size: ${Fonts.superSmall}px;
  font-family: ${Fonts.poppinsMedium};
  text-align: right;
`;
