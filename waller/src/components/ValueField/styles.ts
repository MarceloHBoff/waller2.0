import styled from 'styled-components/native';

import { Fonts, Metrics } from '#styles';

export const Container = styled.View`
  width: 100%;
`;

interface IValueText {
  color: string;
  size: number;
  blinded: boolean;
}

export const ValueText = styled.Text<IValueText>`
  color: ${props => props.color};
  background: ${props => (props.blinded ? props.color : 'transparent')};
  border-radius: ${Metrics.radius}px;
  font-size: ${props => props.size}px;
  line-height: ${props => props.size + 8}px;
  font-family: ${Fonts.poppinsMedium};
  text-align: center;
  width: 100%;
`;
