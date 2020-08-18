import { FlatList, Animated } from 'react-native';

import styled from 'styled-components/native';

import ValueField from '#components/ValueField';
import { Colors, Metrics, Fonts } from '#styles';

import { IListActives } from '.';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
`;

export const Cards = styled(FlatList as new () => FlatList<IListActives>)``;

export const Card = styled(Animated.View)`
  height: 110px;
  width: 180px;

  border-radius: ${Metrics.radius}px;
  margin: ${Metrics.base / 2}px;
  padding: ${Metrics.base / 2}px;
  background: ${Colors.primaryDark};
`;

const DefaultText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.small}px;
  font-family: ${Fonts.poppinsMedium};
`;

export const Code = styled(DefaultText)``;

export const Name = styled(DefaultText)`
  font-size: ${Fonts.superSmall}px;
  margin-bottom: 4px;
`;

export const Quantity = styled(ValueField)`
  color: #fff;
`;

export const Footer = styled.View`
  margin-top: 4px;
  flex-direction: row;
  justify-content: space-between;
`;

interface IVariation {
  signal: string;
}

export const Variation = styled(DefaultText)<IVariation>`
  color: ${props =>
    Number(props.signal) > 0 ? Colors.greenLight : Colors.dangerSuperDark};
`;

export const Price = styled(DefaultText)``;
