import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '../../styles';

interface IContainer {
  width: number;
}

export const Container = styled.View<IContainer>`
  width: ${props => `${props.width}%`};

  align-items: center;
  flex-direction: row;
`;

export const TableHeaderText = styled.Text`
  padding: ${Metrics.base / 2}px;
  color: ${Colors.white};
  font-size: ${Fonts.superSmall}px;
  font-family: ${Fonts.poppinsMedium};
  text-align: right;
`;
