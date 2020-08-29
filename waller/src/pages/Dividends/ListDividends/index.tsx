import React from 'react';
import { FlatList } from 'react-native';

import { IDividend } from '#types/Dividends';
import { formatPrice } from '#utils/format';

import { Container, ModalContainer, Dividend, Text } from './styles';

interface ListDividendsProps {
  dividends?: IDividend[];
}

const ListDividends: React.FC<ListDividendsProps> = ({ dividends }) => {
  return (
    <Container>
      <ModalContainer style={{ elevation: 1 }}>
        <FlatList<IDividend>
          data={dividends}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Dividend>
              <Text style={{ width: '20%', textAlign: 'left' }}>
                {item.active.code}
              </Text>
              <Text style={{ width: '20%' }}>{item.type}</Text>
              <Text style={{ width: '30%' }}>{item.pay_date}</Text>
              <Text style={{ width: '10%' }}>{item.quantity}</Text>
              <Text style={{ width: '20%' }}>{formatPrice(item.value)}</Text>
            </Dividend>
          )}
        />
      </ModalContainer>
    </Container>
  );
};

export default ListDividends;
