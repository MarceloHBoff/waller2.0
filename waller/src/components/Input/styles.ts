import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import styled, { css } from 'styled-components/native';

import { Colors, Metrics, Fonts } from '../../styles';

interface InputProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<InputProps>`
  width: 100%;
  height: 60px;
  padding: 0 ${Metrics.base}px;
  background: ${Colors.grayDark};
  border-color: ${Colors.grayDark};
  border-width: 2px;
  border-radius: ${Metrics.radius}px;
  margin-bottom: ${Metrics.base}px;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${Colors.danger};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${Colors.primary};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: ${Fonts.small}px;
  font-family: ${Fonts.robotoRegular};
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-right: ${Metrics.base}px;
`;
