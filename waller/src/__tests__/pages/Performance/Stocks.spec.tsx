import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Actives from '#pages/Performance/Actives';

import apiMock from '../../utils/ApiMock';

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => ({
      name: 'Stock',
    }),
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
        type: 'Stock',
        code: 'MSFT',
        name: 'Microsoft',
        price: 200,
        last_price: 202,
      },
    },
  ],
};

apiMock.onGet('/userActives').reply(200, data);

describe('Performance Stocks page', () => {
  it('should be to render Performance Stocks page', async () => {
    const { getByTestId } = render(<Actives />);

    await waitFor(() => {
      expect(getByTestId('actives-list')).toBeTruthy();
    });
  });
});
