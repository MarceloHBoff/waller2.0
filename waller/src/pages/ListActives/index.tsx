import React, { useMemo, useCallback, useState } from 'react';

import Header, { HeaderText } from '#components/Header';
import { useFetch } from '#hooks/swr';
import { IUserActivesResponse } from '#types/UserActive';
import { formatPrice, round10 } from '#utils/format';

import api from '../../services/api';

import {
  Container,
  Cards,
  Card,
  Code,
  Name,
  Quantity,
  Footer,
  Variation,
  Price,
} from './styles';

export interface IListActives {
  id: string;
  code: string;
  name: string;
  quantity: number;
  variation: string;
  price: string;
}

const ListActives: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { data, mutate } = useFetch<IUserActivesResponse>('userActives');

  const userActives = useMemo(() => {
    if (!data?.actives) return [];

    return data?.actives.map(userActive => ({
      id: userActive.active.id,
      code: userActive.active.code,
      name: userActive.active.name,
      quantity: userActive.quantity,
      variation: round10(
        (userActive.active.price / userActive.active.last_price - 1) * 100,
      ).toFixed(2),
      price: formatPrice(userActive.active.price),
    }));
  }, [data]);

  const updateActivesPrice = useCallback(async () => {
    setLoading(true);

    try {
      const responde = await api.put<IUserActivesResponse>('userActives');

      mutate(responde.data);
    } catch {}

    setLoading(false);
  }, [mutate]);

  return (
    <Container>
      <Header>
        <HeaderText>Today price</HeaderText>
      </Header>

      <Cards
        data={userActives}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={{ alignItems: 'center' }}
        onRefresh={updateActivesPrice}
        refreshing={loading}
        renderItem={({ item }) => (
          <Card>
            <Code>{item.code}</Code>
            <Name numberOfLines={1}>{item.name}</Name>
            <Quantity>{item.quantity}</Quantity>
            <Footer>
              <Variation signal={item.variation}>{item.variation}%</Variation>
              <Price>{item.price}</Price>
            </Footer>
          </Card>
        )}
      />
    </Container>
  );
};

export default ListActives;
