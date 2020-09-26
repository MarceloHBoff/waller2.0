import { FlatList } from 'react-native';

import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '#styles';

import { IActives } from '.';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
`;

export const Wrapper = styled.View`
  align-items: center;
`;

export const List = styled(FlatList as new () => FlatList<IActives>)`
  margin-bottom: 150px;
`;

interface IVariation {
  signal?: number | string;
}

export const ListItem = styled.View<IVariation>`
  background: ${Colors.primary};
  width: ${Metrics.width - 50}px;
  height: 50px;
  margin: 10px;
  padding: 10px;
  border-radius: ${Metrics.radius}px;

  border-left-width: 10px;
  border-left-color: ${props =>
    Number(props.signal) > 0 ? Colors.greenLight : Colors.dangerSuperDark};

  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const ListItemHeader = styled(ListItem)`
  border-left-width: 0;
  background: ${Colors.grayDark};
`;

const DefaultText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.small}px;
  font-family: ${Fonts.poppinsMedium};
`;

export const Code = styled(DefaultText)``;

export const Variation = styled(DefaultText)<IVariation>`
  width: 20%;
  text-align: right;
  color: ${props =>
    Number(props.signal) > 0 ? Colors.greenLight : Colors.dangerSuperDark};
`;
