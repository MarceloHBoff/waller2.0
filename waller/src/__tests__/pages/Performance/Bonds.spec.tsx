import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Bonds from '#pages/Performance/Bonds';

import apiMock from '../../utils/ApiMock';

const data = [
  {
    id: '1',
    name: 'teste',
    buy_price: 100,
    now_price: 110,
    due_date: '12/08/2020',
  },
];

apiMock.onGet('/userBonds').reply(200, data);

describe('Performance Bonds page', () => {
  it('should be to render Performance Bonds page', async () => {
    const { getByTestId } = render(<Bonds />);

    await waitFor(() => {
      expect(getByTestId('bonds-list')).toBeTruthy();
    });
  });
});
