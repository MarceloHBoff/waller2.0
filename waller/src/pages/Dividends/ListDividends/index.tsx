import React from 'react';
import { FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors } from '#styles';

import {
  Container,
  ModalContainer,
  Title,
  CloseButton,
  Header,
  Dividend,
  Text,
} from './styles';

export interface IDividendList {
  id: string;
  code: string;
  type: string;
  pay_date: string;
  value: string | number;
}

interface ListDividendsProps {
  title?: string;
  dividends?: IDividendList[];
  open: boolean;
  setOpen(open: boolean): void;
}

const ListDividends: React.FC<ListDividendsProps> = ({
  title = 'Dividends',
  dividends,
  open,
  setOpen,
}) => {
  return (
    <Modal transparent animated animationType="fade" visible={open}>
      <Container>
        <ModalContainer style={{ elevation: 1 }}>
          <Title>{title}</Title>

          <CloseButton onPress={() => setOpen(false)}>
            <Icon name="times" size={26} color={Colors.white} />
          </CloseButton>

          <Header>
            <Text style={{ width: '20%', textAlign: 'left' }}>Code</Text>
            <Text style={{ width: '20%' }}>Type</Text>
            <Text style={{ width: '30%' }}>Pay Date</Text>
            <Text style={{ width: '30%' }}>Value</Text>
          </Header>

          <FlatList<IDividendList>
            data={dividends}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Dividend>
                <Text style={{ width: '20%', textAlign: 'left' }}>
                  {item.code}
                </Text>
                <Text style={{ width: '20%' }}>{item.type}</Text>
                <Text style={{ width: '30%' }}>{item.pay_date}</Text>
                <Text style={{ width: '30%' }}>{item.value}</Text>
              </Dividend>
            )}
          />
        </ModalContainer>
      </Container>
    </Modal>
  );
};

export default ListDividends;
