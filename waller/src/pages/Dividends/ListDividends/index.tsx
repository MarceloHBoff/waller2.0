import React, {
  useMemo,
  useState,
  createContext,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  OrderTableHeader,
  IOrderTableContext,
} from '#components/OrderTableHeader';
import { Colors } from '#styles';
import { formatPrice } from '#utils/format';
import { SortArray, Sorting } from '#utils/sorting';

import {
  Container,
  ModalContainer,
  Title,
  CloseButton,
  Dividend,
  Header,
  Footer,
  Text,
} from './styles';

export interface IDividendList {
  id: string;
  code: string;
  type: string;
  pay_date: string;
  pay_date_order?: Date;
  value: string | number;
}

interface ListDividendsProps {
  title?: string;
  dividends?: IDividendList[];
}

export interface ListDividendsHandles {
  openModal: () => void;
}

const Headers = [
  { id: 'code', align: 'left', width: 20, text: 'Code' },
  { id: 'type', width: 20, text: 'Type' },
  { id: 'pay_date_order', width: 30, text: 'Pay Date' },
  { id: 'value', width: 30, text: 'Value(R$)' },
];

const ListDividends: React.RefForwardingComponent<
  ListDividendsHandles,
  ListDividendsProps
> = ({ title = 'Dividends', dividends }, ref) => {
  const [visible, setVisible] = useState(false);
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const Context = createContext({} as IOrderTableContext);

  const total = useMemo(() => {
    const totalDividends = dividends?.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.value),
      0,
    );

    return formatPrice(totalDividends);
  }, [dividends]);

  const dividendsEditted = useMemo(() => {
    if (!dividends) return [];

    const dividendsUnsorted = dividends?.map(dividend => ({
      ...dividend,
      pay_date_order: new Date(
        Number(dividend.pay_date.substr(7, 4)),
        Number(dividend.pay_date.substr(3, 2)) + 1,
        Number(dividend.pay_date.substr(0, 2)),
      ),
    }));

    const dividendSorted = SortArray<IDividendList>(
      dividendsUnsorted,
      Sorting<IDividendList>(order, orderBy),
    );

    return dividendSorted.map(dividend => ({
      ...dividend,
      value: formatPrice(Number(dividend.value)),
    }));
  }, [dividends, order, orderBy]);

  const openModal = useCallback(() => setVisible(true), []);

  const closeModal = useCallback(() => setVisible(false), []);

  useImperativeHandle(ref, () => ({ openModal }));

  return (
    <Modal transparent animated animationType="slide" visible={visible}>
      <Container>
        <ModalContainer style={{ elevation: 1 }}>
          <Title>{title}</Title>

          <CloseButton onPress={closeModal}>
            <Icon name="times" size={26} color={Colors.white} />
          </CloseButton>

          <Header>
            <Context.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
              <OrderTableHeader headers={Headers} context={Context} />
            </Context.Provider>
          </Header>

          <FlatList<IDividendList>
            data={dividendsEditted}
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

          <Footer style={{ elevation: 1 }}>
            <Text style={{ width: '70%', textAlign: 'center' }}>Total</Text>
            <Text style={{ width: '30%' }}>{total}</Text>
          </Footer>
        </ModalContainer>
      </Container>
    </Modal>
  );
};

export default forwardRef(ListDividends);
