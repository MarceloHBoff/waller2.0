import React from 'react';

import Header, { HeaderText } from '#components/Header';

import Card from './Card';
import { Container } from './styles';

const Dividends: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderText>Dividends</HeaderText>
      </Header>

      <Card />
      <Card />
    </Container>
  );
};

export default Dividends;
