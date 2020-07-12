import styled from 'styled-components/native';

import ValueField from '../../components/ValueField';
import { Colors, Fonts, Metrics } from '../../styles';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
`;

export const Header = styled.View`
  height: 80px;
  border-bottom-left-radius: ${Metrics.radius * 2}px;
  border-bottom-right-radius: ${Metrics.radius * 2}px;
  background: ${Colors.primarySuperDark};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${Metrics.base}px;
`;

export const HeaderText = styled.Text`
  color: ${Colors.white};
  font-size: ${Fonts.regular}px;
  font-family: ${Fonts.poppinsMedium};
`;

export const Cards = styled.ScrollView`
  max-height: ${Metrics.base * 2 + 180}px;
`;

export const Card = styled.View`
  border-radius: ${Metrics.radius}px;
  background: ${Colors.gray};
  margin: ${Metrics.base}px;
  padding: ${Metrics.base}px;

  width: 160px;
  height: 160px;

  justify-content: space-between;
  align-items: center;
`;

interface ICardText {
  color: string;
}

export const CardText = styled.Text<ICardText>`
  color: ${props => props.color};
  font-size: ${Fonts.regular}px;
  font-family: ${Fonts.poppinsMedium};
`;
