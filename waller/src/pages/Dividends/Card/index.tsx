import React, { useMemo } from 'react';

import { formatPrice } from '#utils/format';

import { Container, Wrapper, CardText } from './styles';

interface CardProps {
  value: number | undefined;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ value, onPress }) => {
  const valueEditted = useMemo(() => formatPrice(value), [value]);

  return (
    <Container onPress={onPress}>
      <Wrapper style={{ elevation: 1 }}>
        <CardText>{valueEditted}</CardText>
      </Wrapper>
    </Container>
  );
};

export default Card;
