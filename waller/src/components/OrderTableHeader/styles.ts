import styled from 'styled-components/native';

import { Colors, Fonts, Metrics } from '#styles';

export const TableHeaderContainer = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 ${Metrics.base / 2}px;
`;

interface IContainer {
  width: number;
}

export const Container = styled.View<IContainer>`
  width: ${props => `${props.width}%`};
`;

interface ITableHeaderButton {
  align?: string;
}

export const TableHeaderButton = styled.TouchableOpacity<ITableHeaderButton>`
  width: 100%;

  justify-content: ${props =>
    props.align === 'left' ? 'flex-start' : 'flex-end'};
  align-items: center;
  flex-direction: row;
`;

export const TableHeaderText = styled.Text`
  padding: ${Metrics.base / 2}px;
  color: ${Colors.white};
  font-size: ${Fonts.superSmall}px;
  font-family: ${Fonts.poppinsMedium};
`;
