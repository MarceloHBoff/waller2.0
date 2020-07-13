import React, { useMemo } from 'react';

import { useRoute } from '@react-navigation/native';

import { useFetch } from '../../../hooks/swr';
import { round10 } from '../../../utils/format';

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
  const { data } = useFetch<IUserActivesResponse>('userActives');

  const { name } = useRoute();

  const userActives = useMemo(() => {
    if (!data) return [];

    return data.actives
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
  }, [data, name]);

  return (
    <Container>
      <Active style={{ elevation: 1 }}>
        <ActiveText style={{ width: '17%', textAlign: 'left' }}>
          Code
        </ActiveText>
        <ActiveText style={{ width: '18%' }}>Quantity</ActiveText>
        <ActiveText style={{ width: '20%' }}>Buy Price</ActiveText>
        <ActiveText style={{ width: '20%' }}>Now Price</ActiveText>
        <ActiveText style={{ width: '25%' }}>Total Value</ActiveText>
      </Active>

      <ActivesContainer
        data={userActives}
        keyExtractor={active => active.id}
        renderItem={({ item: active, index }) => (
          <Active index={index}>
            <ActiveText style={{ width: '17%', textAlign: 'left' }}>
              {active.code}
            </ActiveText>
            <ActiveText style={{ width: '18%' }}>{active.quantity}</ActiveText>
            <ActiveText style={{ width: '20%' }}>{active.buyPrice}</ActiveText>
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
