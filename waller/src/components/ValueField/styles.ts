import styled from 'styled-components/native';

import { Fonts } from '../../styles';

export const Container = styled.View`
  width: 100%;
`;

interface IValueText {
  color: string;
  size: number;
}

export const ValueText = styled.Text<IValueText>`
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  line-height: ${props => props.size + 8}px;
  font-family: ${Fonts.poppinsMedium};
  text-align: center;
  width: 100%;

  /* background: ${props => props.color}; */
`;
