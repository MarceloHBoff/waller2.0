import React, { useState, useEffect, createContext, useMemo } from 'react';

import Header, { HeaderText } from '#components/Header';
import Loading from '#components/Loading';
import Nothing from '#components/Nothing';
import {
  OrderTableHeader,
  IOrderTableContext,
} from '#components/OrderTableHeader';
import { IUserActivesResponse, IUserActives } from '#types/UserActive';
import { roundTo2, formatPrice } from '#utils/format';
import { SortArray, Sorting } from '#utils/sorting';

import api from '../../services/api';

import {
  Container,
  Wrapper,
  List,
  ListItem,
  Code,
  Variation,
  ListItemHeader,
} from './styles';

export interface IActives {
  id: string;
  code: string;
  quantity: number;
  variation: string | number;
  buy_price: string | number;
  price: string | number;
}

const Headers = [
  { id: 'code', align: 'left', width: 20, text: 'Code' },
  { id: 'price', align: 'left', width: 30, text: 'Price' },
  { id: 'buy_price', align: 'left', width: 30, text: 'Buy Price' },
  { id: 'variation', width: 20, text: 'Proffit' },
];

const Rentability: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [actives, setActives] = useState<IUserActives[]>([]);
  const [orderBy, setOrderBy] = useState('variation');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const Context = createContext({} as IOrderTableContext);

  const userActivesEditted = useMemo(() => {
    const userActivesUnsorted = actives.map(userActive => ({
      id: userActive.active.id,
      code: userActive.active.code,
      quantity: userActive.quantity,
      variation: (userActive.active.price / userActive.buy_price - 1) * 100,
      buy_price: userActive.buy_price,
      price: userActive.active.price,
    }));

    const userActivesSorted = SortArray<IActives>(
      userActivesUnsorted,
      Sorting<IActives>(order, orderBy),
    );

    return userActivesSorted.map(userActive => ({
      ...userActive,
      variation: roundTo2(userActive.variation),
      buy_price: formatPrice(Number(userActive.buy_price)),
      price: formatPrice(Number(userActive.price)),
    }));
  }, [actives, order, orderBy]);

  useEffect(() => {
    setLoading(true);

    api
      .get<IUserActivesResponse>('userActives')
      .then(response => setActives(response.data.actives))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <Header>
        <HeaderText>Rentability</HeaderText>
      </Header>

      {loading ? (
        <Loading size={120} />
      ) : userActivesEditted.length === 0 ? (
        <Nothing text="None actives yet" />
      ) : (
        <Wrapper>
          <ListItemHeader>
            <Context.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
              <OrderTableHeader headers={Headers} context={Context} />
            </Context.Provider>
          </ListItemHeader>
          <List
            testID="list"
            data={userActivesEditted}
            keyExtractor={item => item.id}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) => (
              <ListItem signal={item.variation}>
                <Code style={{ width: '20%' }}>{item.code}</Code>
                <Code style={{ width: '30%' }}>{item.price}</Code>
                <Code style={{ width: '30%' }}>{item.buy_price}</Code>
                <Variation signal={item.variation}>{item.variation}%</Variation>
              </ListItem>
            )}
          />
        </Wrapper>
      )}
    </Container>
  );
};

export default Rentability;
