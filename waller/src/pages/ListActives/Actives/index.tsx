import React, { useMemo, createContext, useState } from 'react';

import { useRoute } from '@react-navigation/native';

import {
  OrderTableHeader,
  IOrderTableContext,
} from '../../../components/OrderTableHeader';
import { useFetch } from '../../../hooks/swr';
import { round10 } from '../../../utils/format';
import { SortArray, Sorting } from '../../../utils/sorting';
import Nothing from '../Nothing';

import { Container, ActivesContainer, Active, ActiveText } from './styles';

export interface UserActive {
  id: string;
  code: string;
  quantity: number;
  buyPrice: number | string;
  nowPrice: number | string;
  totalValue: number | string;
}

interface IUserActivesResponse {
  actives: {
    quantity: number;
    buyPrice: number;
    active: {
      id: string;
      type: string;
      code: string;
      price: number;
    };
  }[];
}

const Actives: React.FC = () => {
  const [orderBy, setOrderBy] = useState('code');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { data } = useFetch<IUserActivesResponse>('userActives');

  const { name } = useRoute();

  const Context = createContext({} as IOrderTableContext);

  const currency = useMemo(() => {
    if (name === 'Stock' || name === 'Reit') return '(U$)';
    return '(R$)';
  }, [name]);

  const ActivesHeader = useMemo(
    () => [
      { id: 'code', width: 15, align: 'left', text: 'Code' },
      { id: 'quantity', width: 18, text: 'Quantity' },
      { id: 'buyPrice', width: 23, text: `Buy${currency}` },
      { id: 'nowPrice', width: 20, text: `Now${currency}` },
      { id: 'totalValue', width: 25, text: `Total${currency}` },
    ],
    [currency],
  );

  const userActives = useMemo(() => {
    if (!data) return [];

    let userActivesEdited: UserActive[] = data.actives
      .filter(userActive => userActive.active.type === name)
      .map(userActive => ({
        id: userActive.active.id,
        code: userActive.active.code,
        quantity: userActive.quantity,
        buyPrice: userActive.buyPrice,
        nowPrice: Number(userActive.active.price),
        totalValue: userActive.quantity * userActive.active.price,
      }));

    userActivesEdited = SortArray<UserActive>(
      userActivesEdited,
      Sorting<UserActive>(order, orderBy),
    );

    return userActivesEdited.map(userActive => ({
      ...userActive,
      buyPrice: round10(userActive.buyPrice).toFixed(2),
      nowPrice: round10(userActive.nowPrice).toFixed(2),
      totalValue: round10(userActive.totalValue).toFixed(2),
    }));
  }, [data, name, orderBy, order]);

  return (
    <Container>
      {userActives.length === 0 ? (
        <Nothing />
      ) : (
        <>
          <Context.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
            <OrderTableHeader headers={ActivesHeader} context={Context} />
          </Context.Provider>

          <ActivesContainer
            data={userActives}
            keyExtractor={active => active.id}
            renderItem={({ item: active, index }) => (
              <Active index={index}>
                <ActiveText style={{ width: '15%', textAlign: 'left' }}>
                  {active.code}
                </ActiveText>
                <ActiveText style={{ width: '18%' }}>
                  {active.quantity}
                </ActiveText>
                <ActiveText style={{ width: '23%' }}>
                  {active.buyPrice}
                </ActiveText>
                <ActiveText style={{ width: '20%' }}>
                  {active.nowPrice}
                </ActiveText>
                <ActiveText style={{ width: '25%' }}>
                  {active.totalValue}
                </ActiveText>
              </Active>
            )}
          />
        </>
      )}
    </Container>
  );
};

export default Actives;
