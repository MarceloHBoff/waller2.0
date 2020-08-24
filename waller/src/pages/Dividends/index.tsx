import React from 'react';

import Header, { HeaderText } from '#components/Header';
import { useFetch } from '#hooks/swr';
import { IDividendsResponse } from '#types/Dividends';

import Card from './Card';
import { Container } from './styles';

const Dividends: React.FC = () => {
  const { data } = useFetch<IDividendsResponse>('dividends/receivable');

  const { data: dividends } = useFetch<IDividendsResponse>('dividends');

  return (
    <Container>
      <Header>
        <HeaderText>Dividends</HeaderText>
      </Header>

      <Card value={data?.total} />
      <Card value={dividends?.total} />
    </Container>
  );
};

export default Dividends;
