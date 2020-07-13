import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../styles';

export const Container = styled.View`
  flex: 1;
  background: ${Colors.grayDarker};
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
  margin: 0 ${Metrics.base}px;
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
