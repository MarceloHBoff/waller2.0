import React from 'react';
import { Text } from 'react-native';

import {
  Container,
  TopCircle,
  TopSubCircle,
  BottomCircle,
  BottomSubCircle,
  Top,
  Bottom,
} from './styles';

interface CardProps {
  value: number | undefined;
}

const Card: React.FC<CardProps> = ({ value }) => {
  return (
    <Container>
      <Top>
        <TopCircle />
        <TopSubCircle />
      </Top>
      <Text>{value}</Text>
      <Bottom>
        <BottomCircle />
        <BottomSubCircle />
      </Bottom>
    </Container>
  );
};

export default Card;
