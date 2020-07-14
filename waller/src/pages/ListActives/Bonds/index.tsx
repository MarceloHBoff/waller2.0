import React, { useMemo } from 'react';

import { useRoute } from '@react-navigation/native';

import { useFetch } from '../../../hooks/swr';
import { round10 } from '../../../utils/format';

import { Container, ActivesContainer, Active, ActiveText } from './styles';

export interface UserBond {
  id: string;
  name: string;
  buyPrice: number;
  nowPrice: string;
  dueDate: string;
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

const Bonds: React.FC = () => {
  const { data } = useFetch<IUserActivesResponse>('userBonds');

  const { name } = useRoute();

  const userBonds = useMemo(() => {
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
        <ActiveText style={{ width: '15%', textAlign: 'left' }}>
          Code
        </ActiveText>
        <ActiveText style={{ width: '18%' }}>Quantity</ActiveText>
        <ActiveText style={{ width: '22%' }}>Buy{currency}</ActiveText>
        <ActiveText style={{ width: '20%' }}>Now{currency}</ActiveText>
        <ActiveText style={{ width: '25%' }}>Total{currency}</ActiveText>
      </Active>

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

export default Bonds;
