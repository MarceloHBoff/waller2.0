import React, { useMemo, createContext, useState } from 'react';

import {
  OrderTableHeader,
  IOrderTableContext,
} from '#components/OrderTableHeader';
import { useFetch } from '#hooks/swr';
import { round10 } from '#utils/format';
import { SortArray, Sorting } from '#utils/sorting';

import Nothing from '../Nothing';
import { ListContainer, BondList, List, ListText } from '../styles';

export interface UserBond {
  name: string;
  buyPrice: string;
  nowPrice: string;
  dueDate: string;
}

const BondsHeader = [
  { id: 'name', align: 'left', width: 40, text: 'Name' },
  { id: 'buyPrice', width: 20, text: `Buy(R$)` },
  { id: 'nowPrice', width: 20, text: `Now(R$)` },
  { id: 'dueDate', width: 22, text: `Due Date` },
];

const Bonds: React.FC = () => {
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { data } = useFetch<UserBond[]>('userBonds');

  const Context = createContext({} as IOrderTableContext);

  const userBonds = useMemo(() => {
    if (!data) return [];

    const userBondsUnsorted = data.map(userBond => ({
      name: userBond.name,
      buyPrice: round10(userBond.buyPrice).toFixed(2),
      nowPrice: round10(userBond.nowPrice).toFixed(2),
      dueDate: userBond.dueDate,
    }));

    return SortArray<UserBond>(
      userBondsUnsorted,
      Sorting<UserBond>(order, orderBy),
    );
  }, [data, order, orderBy]);

  return (
    <ListContainer>
      {userBonds.length === 0 ? (
        <Nothing />
      ) : (
        <>
          <Context.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
            <OrderTableHeader headers={BondsHeader} context={Context} />
          </Context.Provider>

          <BondList
            data={userBonds}
            keyExtractor={bond => bond.name}
            renderItem={({ item: bond, index }) => (
              <List index={index}>
                <ListText style={{ width: '40%', textAlign: 'left' }}>
                  {bond.name}
                </ListText>
                <ListText style={{ width: '20%' }}>{bond.buyPrice}</ListText>
                <ListText style={{ width: '20%' }}>{bond.nowPrice}</ListText>
                <ListText style={{ width: '22%' }}>{bond.dueDate}</ListText>
              </List>
            )}
          />
        </>
      )}
    </ListContainer>
  );
};

export default Bonds;
