import React from 'react';

import Header, { HeaderText } from '#components/Header';

import { Container } from './styles';

const Rentability: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderText>Rentability</HeaderText>
      </Header>
    </Container>
  );
};

export default Rentability;
