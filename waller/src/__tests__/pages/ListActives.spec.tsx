import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import ListActives from '#pages/ListActives';

import apiMock from '../utils/ApiMock';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      addListener: () => {},
      removeListener: () => {},
    }),
    useFocusEffect: () => {},
  };
});

const data = {
  actives: [
    {
      id: '1',
      quantity: 1,
      buy_price: 10,
      active: {
        id: '1',
        type: 'Acao',
        code: 'PETR4',
        name: 'Petrobras',
        price: 10,
        last_price: 11,
      },
    },
    {
      id: '1',
      quantity: 1,
      buy_price: 10,
      active: {
        id: '2',
        type: 'Acao',
        code: 'ITUB3',
        name: 'Itau',
        price: 10,
        last_price: 11,
      },
    },
  ],
};

apiMock.onGet('/userActives').reply(200, data);
apiMock.onPut('/userActives').reply(200, data);

describe('ListActives page', () => {
  it('should be to render ListActives page', async () => {
    const { getByText, getByTestId } = render(<ListActives />);

    await waitFor(() => {
      const refresh = getByTestId('cards').props.onRefresh;

      refresh();
    });

    await waitFor(() => {
      expect(getByText('PETR4')).toBeTruthy();
      expect(getByText('ITUB3')).toBeTruthy();
    });
  });
});
