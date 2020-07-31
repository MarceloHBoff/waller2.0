import { Animated } from 'react-native';

import styled from 'styled-components/native';

import { Colors } from '#styles';

interface I {
  selected?: boolean;
}

export const Container = styled.View<I>`
  width: 60px;
  height: 30px;

  border-radius: 50px;
  background: ${props =>
    props.selected ? Colors.primary : Colors.graySuperLight};

  padding: 0 10px;
  margin: 30px;

  justify-content: center;
  align-items: flex-start;
`;

export const Pointer = styled(Animated.View)<I>`
  width: 22px;
  height: 22px;

  border-radius: 50px;
  background: ${props => (props.selected ? Colors.white : Colors.black)};
`;
