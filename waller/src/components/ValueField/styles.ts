import styled from 'styled-components/native';

import { Fonts } from '../../styles';

export const Container = styled.View``;

interface IValueText {
  color: string;
  size: number;
}

export const ValueText = styled.Text<IValueText>`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  font-family: ${Fonts.poppinsMedium};
`;
