import React, { useMemo, createContext, useState } from 'react';

import { useRoute } from '@react-navigation/native';

import OrderTableHeader, {
  IOrderTableContext,
} from '../../../components/OrderTableHeader';
import { useFetch } from '../../../hooks/swr';
import { round10 } from '../../../utils/format';
import { SortArray, Sorting } from '../../../utils/sorting';

import { Container, ActivesContainer, Active, ActiveText } from './styles';

export interface UserActive {
  id: string;
  code: string;
  quantity: number;
  buyPrice: string;
  nowPrice: string;
  totalValue: string;
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
  const [orderBy, setOrderBy] = useState('quantity');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { data } = useFetch<IUserActivesResponse>('userActives');

  const { name } = useRoute();

  const Context = createContext({} as IOrderTableContext);

  const currency = useMemo(() => {
    if (name === 'Stock' || name === 'Reit') return '(U$)';
    return '(R$)';
  }, [name]);

  const userActives = useMemo(() => {
    if (!data) return [];

    const dale = data.actives
      .filter(userActive => userActive.active.type === name)
      .map(userActive => ({
        id: userActive.active.id,
        code: userActive.active.code,
        quantity: userActive.quantity,
        buyPrice: round10(userActive.buyPrice).toFixed(2),
        nowPrice: round10(Number(userActive.active.price)).toFixed(2),
        totalValue: round10(
          userActive.quantity * userActive.active.price,
        ).toFixed(2),
      }));

    return SortArray<UserActive>(dale, Sorting<UserActive>(order, orderBy));
  }, [data, name, orderBy, order]);

  return (
    <Container>
      <Context.Provider value={{ orderBy, setOrderBy, order, setOrder }}>
        <Active style={{ elevation: 1 }}>
          <OrderTableHeader context={Context} width={15}>
            code
          </OrderTableHeader>
          <OrderTableHeader context={Context} width={18}>
            quantity
          </OrderTableHeader>
          <OrderTableHeader context={Context} width={22}>
            buyPrice
          </OrderTableHeader>
          <OrderTableHeader context={Context} width={20}>
            {`Now${currency}`}
          </OrderTableHeader>
          <OrderTableHeader context={Context} width={25}>
            {`Total${currency}`}
          </OrderTableHeader>
        </Active>
      </Context.Provider>

      <ActivesContainer
        data={userActives}
        keyExtractor={active => active.id}
        renderItem={({ item: active, index }) => (
          <Active index={index}>
            <ActiveText style={{ width: '15%', textAlign: 'left' }}>
              {active.code}
            </ActiveText>
            <ActiveText style={{ width: '18%' }}>{active.quantity}</ActiveText>
            <ActiveText style={{ width: '23%' }}>{active.buyPrice}</ActiveText>
            <ActiveText style={{ width: '20%' }}>{active.nowPrice}</ActiveText>
            <ActiveText style={{ width: '25%' }}>
              {active.totalValue}
            </ActiveText>
          </Active>
        )}
      />
    </Container>
  );
};

export default Actives;
