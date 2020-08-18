import styled from 'styled-components/native';

import { Fonts, Metrics } from '#styles';

export const Container = styled.View`
  width: 100%;
`;

interface IValueText {
  colorBase: string;
  colorBlinded: string;
  align: string;
  size: number;
  blinded: boolean;
}

export const ValueText = styled.Text<IValueText>`
  color: ${props => (props.blinded ? props.colorBlinded : props.colorBase)};
  background: ${props => (props.blinded ? props.colorBlinded : 'transparent')};
  border-radius: ${Metrics.radius}px;
  font-size: ${props => props.size}px;
  line-height: ${props => props.size + 8}px;
  font-family: ${Fonts.poppinsMedium};
  text-align: ${props => props.align};
  width: 100%;
`;
