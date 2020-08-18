import React, { useMemo, createContext, useState } from 'react';

import { useRoute } from '@react-navigation/native';

import {
  OrderTableHeader,
  IOrderTableContext,
} from '#components/OrderTableHeader';
import { useConfig } from '#hooks/config';
import { useFetch } from '#hooks/swr';
import { IUserActivesResponse } from '#types/UserActive';
import { roundTo2 } from '#utils/format';
import { SortArray, Sorting } from '#utils/sorting';

import Nothing from '../Nothing';
import {
  ListContainer,
  ActiveList,
  List,
  ListText,
  ValueField,
} from '../styles';

export interface IUserActiveList {
  id: string;
  code: string;
  quantity: number;
  buy_price: number | string;
  now_price: number | string;
  totalValue: number | string;
}

const Actives: React.FC = () => {
  const [orderBy, setOrderBy] = useState('code');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { data } = useFetch<IUserActivesResponse>('userActives');

  const { name } = useRoute();
  const { seeValues } = useConfig();

  const Context = createContext({} as IOrderTableContext);

  const currency = useMemo(() => {
    if (name === 'Stock' || name === 'Reit') return '(U$)';
    return '(R$)';
  }, [name]);

  const ActivesHeader = useMemo(
    () => [
      { id: 'code', width: 15, align: 'left', text: 'Code' },
      { id: 'quantity', width: 18, text: 'Quantity' },
      { id: 'buy_price', width: 23, text: `Buy${currency}` },
      { id: 'now_price', width: 20, text: `Now${currency}` },
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
        buy_price: userActive.buy_price,
        now_price: userActive.active.price,
        totalValue: userActive.quantity * userActive.active.price,
      }));

    userActivesEdited = SortArray<IUserActiveList>(
      userActivesEdited,
      Sorting<IUserActiveList>(order, orderBy),
    );

    return userActivesEdited.map(userActive => ({
      ...userActive,
      buy_price: roundTo2(userActive.buy_price),
      now_price: roundTo2(userActive.now_price),
      totalValue: roundTo2(userActive.totalValue),
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
              <List index={index} testID="actives-list">
                <ListText style={{ width: '15%', textAlign: 'left' }}>
                  {active.code}
                </ListText>
                <ValueField blinded={seeValues} width={18}>
                  {active.quantity}
                </ValueField>
                <ListText style={{ width: '23%' }}>{active.buy_price}</ListText>
                <ListText style={{ width: '20%' }}>{active.now_price}</ListText>
                <ValueField blinded={seeValues} width={25}>
                  {active.totalValue}
                </ValueField>
              </List>
            )}
          />
        </>
      )}
    </ListContainer>
  );
};

export default Actives;
