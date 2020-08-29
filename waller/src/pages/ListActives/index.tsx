import React, { useMemo, useCallback, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import { opacity, left, right, onScreenFocus } from '#animations';
import Header, { HeaderText } from '#components/Header';
import Nothing from '#components/Nothing';
import { useFetch } from '#hooks/swr';
import { Colors, Fonts } from '#styles';
import { IUserActivesResponse } from '#types/UserActive';
import { formatPrice, roundTo2 } from '#utils/format';

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

  useFocusEffect(onScreenFocus);

  const userActives = useMemo(() => {
    if (!data?.actives) return [];

    return data?.actives.map(userActive => ({
      id: userActive.active.id,
      code: userActive.active.code,
      name: userActive.active.name,
      quantity: userActive.quantity,
      variation: roundTo2(
        (userActive.active.price / userActive.active.last_price - 1) * 100,
      ),
      price: formatPrice(userActive.active.price),
    }));
  }, [data]);

  const updateActivesPrice = useCallback(async () => {
    setLoading(true);

    try {
      const responde = await api.put<IUserActivesResponse>('userActives');

      await mutate(responde.data);
    } catch {}

    setLoading(false);
  }, [mutate]);

  return (
    <Container>
      <Header>
        <HeaderText>Today price</HeaderText>
      </Header>

      {userActives.length === 0 ? (
        <Nothing text="None actives yet" />
      ) : (
        <Cards
          testID="cards"
          data={userActives}
          numColumns={2}
          keyExtractor={item => item.id}
          contentContainerStyle={{ alignItems: 'center' }}
          onRefresh={updateActivesPrice}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <Card
              style={{
                opacity,
                transform: [{ translateX: index % 2 ? right.x : left.x }],
              }}
            >
              <Code>{item.code}</Code>
              <Name numberOfLines={1}>{item.name}</Name>
              <Quantity
                align="left"
                size={Fonts.superSmall}
                colorBase={Colors.white}
                colorBlinded={Colors.primaryLight}
              >
                {item.quantity}
              </Quantity>
              <Footer>
                <Variation signal={item.variation}>{item.variation}%</Variation>
                <Price>{item.price}</Price>
              </Footer>
            </Card>
          )}
        />
      )}
    </Container>
  );
};

export default ListActives;
