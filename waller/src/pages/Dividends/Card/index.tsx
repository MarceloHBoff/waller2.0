import React, { useMemo } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { onScreenFocus, opacity, left } from '#animations';
import Loading from '#components/Loading';
import { formatPrice } from '#utils/format';

import { Container, Wrapper, CardText, CardValue } from './styles';

interface CardProps {
  label: string;
  value: number | undefined;
  onPress: () => void;
  loading: boolean;
}

const Card: React.FC<CardProps> = ({ label, value, onPress, loading }) => {
  const valueEditted = useMemo(() => formatPrice(value), [value]);

  useFocusEffect(onScreenFocus);

  return (
    <Container
      style={{ elevation: 1, opacity, transform: [{ translateX: left.x }] }}
    >
      <Wrapper onPress={onPress}>
        <CardText>{label}</CardText>
        {loading ? (
          <Loading size={30} />
        ) : (
          <CardValue>{valueEditted}</CardValue>
        )}
      </Wrapper>
    </Container>
  );
};

export default Card;
