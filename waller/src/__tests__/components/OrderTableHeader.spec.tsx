import React, { createContext } from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import {
  OrderTableHeader,
  IOrderTableContext,
} from '#components/OrderTableHeader';

const Context = createContext({} as IOrderTableContext);

let order: 'asc' | 'desc' = 'asc';
let orderBy = 'code';
const setOrder = (o: 'asc' | 'desc') => {
  order = o;
};
const setOrderBy = (o: string) => {
  orderBy = o;
};

describe('OrderTableHeader component', () => {
  it('should be able to render OrderTableHeader', async () => {
    const { getByTestId, rerender } = render(
      <Context.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
        <OrderTableHeader
          headers={[{ id: 'code', width: 15, text: 'Code' }]}
          context={Context}
        />
      </Context.Provider>,
    );

    const orderTable = getByTestId('order-table');

    fireEvent.press(orderTable);

    expect(order).toBe('desc');
    expect(orderBy).toBe('code');

    rerender(
      <Context.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
        <OrderTableHeader
          headers={[{ id: 'code', width: 15, text: 'Code' }]}
          context={Context}
        />
      </Context.Provider>,
    );

    fireEvent.press(orderTable);

    expect(order).toBe('asc');
    expect(orderBy).toBe('code');
  });
});
