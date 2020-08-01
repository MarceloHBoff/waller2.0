import { FlatList } from 'react-native';

import styled, { css } from 'styled-components/native';

import { Colors, Fonts, Metrics } from '#styles';

import { IUserActiveList } from './Actives';
import { UserBond } from './Bonds';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
`;

export const ListContainer = styled.View`
  flex: 1;
  background: ${Colors.grayDark};
`;

export const ActiveList = styled(
  FlatList as new () => FlatList<IUserActiveList>,
)`
  background: ${Colors.grayDark};
`;

export const BondList = styled(FlatList as new () => FlatList<UserBond>)`
  background: ${Colors.grayDark};
`;

interface IList {
  index?: number;
}

export const List = styled.View<IList>`
  flex-direction: row;
  width: 100%;
  padding: 0 ${Metrics.base / 2}px;

  ${props =>
    Number(props.index) % 2 === 0 &&
    css`
      background: ${Colors.grayDarker};
    `}
`;

export const ListText = styled.Text`
  width: 20%;
  padding: ${Metrics.base / 2}px;
  color: ${Colors.white};
  font-size: ${Fonts.superSmall}px;
  font-family: ${Fonts.poppinsMedium};
  text-align: right;
`;

interface IValueFieldProps {
  blinded: boolean;
}

export const ValueField = styled(ListText)<IValueFieldProps>`
  background: ${props => (!props.blinded ? Colors.white : 'transparent')};
  border-radius: ${Metrics.radius}px;

  ${props =>
    !props.blinded &&
    css`
      font-size: 0px;
      margin: ${Metrics.base / 2}px;
    `}
`;
