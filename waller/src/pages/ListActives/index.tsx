import React, { useCallback, useState, useEffect } from 'react';

import Header, { HeaderText } from '#components/Header';
import Loading from '#components/Loading';
import Nothing from '#components/Nothing';
import { Colors, Fonts } from '#styles';
import { IUserActivesResponse, IUserActives } from '#types/UserActive';
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
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [actives, setActives] = useState<IListActives[]>([]);

  const editUserActive = useCallback(
    (activesList: IUserActives[]) =>
      activesList.map(userActive => ({
        id: userActive.active.id,
        code: userActive.active.code,
        name: userActive.active.name,
        quantity: userActive.quantity,
        variation: roundTo2(
          (userActive.active.price / userActive.active.last_price - 1) * 100,
        ),
        price: formatPrice(userActive.active.price),
      })),
    [],
  );

  useEffect(() => {
    setLoading(true);

    api
      .get<IUserActivesResponse>('userActives')
      .then(response => setActives(editUserActive(response.data.actives)))
      .finally(() => setLoading(false));
  }, [editUserActive]);

  const updateActivesPrice = useCallback(async () => {
    setLoadingUpdate(true);

    try {
      const response = await api.put<IUserActives[]>('userActives');
      const editedActives = editUserActive(response.data);
      setActives(editedActives);
    } catch {}

    setLoadingUpdate(false);
  }, [editUserActive]);

  return (
    <Container>
      <Header>
        <HeaderText>Today price</HeaderText>
      </Header>

      {loading ? (
        <Loading size={120} />
      ) : actives.length === 0 ? (
        <Nothing text="None actives yet" />
      ) : (
        <Cards
          testID="cards"
          data={actives}
          numColumns={2}
          keyExtractor={item => item.id}
          contentContainerStyle={{ alignItems: 'center' }}
          onRefresh={updateActivesPrice}
          refreshing={loadingUpdate}
          renderItem={({ item }) => (
            <Card>
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
