import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors } from '../../styles';

import { Container, TableHeaderText } from './styles';

export interface IOrderTableContext {
  orderBy: string;
  setOrderBy: (data: string) => void;
  order: 'asc' | 'desc';
  setOrder: (data: 'asc' | 'desc') => void;
}

interface IOrderTableHeaderProps {
  width: number;
  context: React.Context<IOrderTableContext>;
}

const OrderTableHeader: React.FC<IOrderTableHeaderProps> = ({
  width,
  context,
  children,
}) => {
  const { orderBy, setOrderBy, order, setOrder } = useContext(context);

  function handleClick(text: string) {
    if (orderBy === text) {
      if (order === 'desc') {
        setOrder('asc');
      } else {
        setOrder('desc');
      }
    } else {
      setOrder('asc');
    }

    setOrderBy(text);
  }

  return (
    <Container width={width}>
      <TouchableOpacity onPress={() => handleClick(String(children))}>
        <TableHeaderText>{children}</TableHeaderText>
      </TouchableOpacity>

      {orderBy === children &&
        (order === 'asc' ? (
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
    </Container>
  );
};

export default OrderTableHeader;
