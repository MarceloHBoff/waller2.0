import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors } from '../../styles';

import {
  TableHeaderContainer,
  Container,
  TableHeaderButton,
  TableHeaderText,
} from './styles';

export interface IOrderTableContext {
  orderBy: string;
  setOrderBy: (data: string) => void;
  order: 'asc' | 'desc';
  setOrder: (data: 'asc' | 'desc') => void;
}

interface IOrderTableHeader {
  id: string;
  width: number;
  align?: string;
  text: string;
}

interface IOrderTableHeaderProps {
  headers: IOrderTableHeader[];
  context: React.Context<IOrderTableContext>;
}

const OrderTableHeader: React.FC<IOrderTableHeaderProps> = ({
  headers,
  context,
}) => {
  const { orderBy, setOrderBy, order, setOrder } = useContext(context);

  function handleClick(text: string) {
    const isDesc = orderBy === text && order === 'asc';

    setOrder(isDesc ? 'desc' : 'asc');
    setOrderBy(text);
  }

  return (
    <TableHeaderContainer style={{ elevation: 1 }}>
      {headers.map(header => (
        <Container width={header.width} key={header.id}>
          <TableHeaderButton
            align={header.align}
            onPress={() => handleClick(header.id)}
          >
            <TableHeaderText>{header.text}</TableHeaderText>

            {orderBy === header.id &&
              (order === 'desc' ? (
                <Icon
                  name="sort-up"
                  size={20}
                  color={Colors.primary}
                  style={{ paddingTop: 5 }}
                />
              ) : (
                <Icon
                  name="sort-down"
                  size={20}
                  color={Colors.primary}
                  style={{ paddingBottom: 10 }}
                />
              ))}
          </TableHeaderButton>
        </Container>
      ))}
    </TableHeaderContainer>
  );
};

export { OrderTableHeader };
