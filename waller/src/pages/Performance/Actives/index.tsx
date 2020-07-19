import React, { useMemo, createContext, useState } from 'react';

import { useRoute } from '@react-navigation/native';

import {
  OrderTableHeader,
  IOrderTableContext,
} from '#components/OrderTableHeader';
import { useFetch } from '#hooks/swr';
import { IUserActivesResponse } from '#types/UserActive';
import { round10 } from '#utils/format';
import { SortArray, Sorting } from '#utils/sorting';

import Nothing from '../Nothing';
import { ListContainer, ActiveList, List, ListText } from '../styles';

export interface IUserActiveList {
  id: string;
  code: string;
  quantity: number;
  buyPrice: number | string;
  nowPrice: number | string;
  totalValue: number | string;
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

    let userActivesEdited: IUserActiveList[] = data.actives
      .filter(userActive => userActive.active.type === name)
      .map(userActive => ({
        id: userActive.active.id,
        code: userActive.active.code,
        quantity: userActive.quantity,
        buyPrice: userActive.buyPrice,
        nowPrice: userActive.active.price,
        totalValue: userActive.quantity * userActive.active.price,
      }));

    userActivesEdited = SortArray<IUserActiveList>(
      userActivesEdited,
      Sorting<IUserActiveList>(order, orderBy),
    );

    return userActivesEdited.map(userActive => ({
      ...userActive,
      buyPrice: round10(userActive.buyPrice).toFixed(2),
      nowPrice: round10(userActive.nowPrice).toFixed(2),
      totalValue: round10(userActive.totalValue).toFixed(2),
    }));
  }, [data, name, orderBy, order]);

  return (
    <ListContainer>
      {userActives.length === 0 ? (
        <Nothing />
      ) : (
        <>
          <Context.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
            <OrderTableHeader headers={ActivesHeader} context={Context} />
          </Context.Provider>

          <ActiveList
            data={userActives}
            keyExtractor={active => active.id}
            renderItem={({ item: active, index }) => (
              <List index={index}>
                <ListText style={{ width: '15%', textAlign: 'left' }}>
                  {active.code}
                </ListText>
                <ListText style={{ width: '18%' }}>{active.quantity}</ListText>
                <ListText style={{ width: '23%' }}>{active.buyPrice}</ListText>
                <ListText style={{ width: '20%' }}>{active.nowPrice}</ListText>
                <ListText style={{ width: '25%' }}>
                  {active.totalValue}
                </ListText>
              </List>
            )}
          />
        </>
      )}
    </ListContainer>
  );
};

export default Actives;
