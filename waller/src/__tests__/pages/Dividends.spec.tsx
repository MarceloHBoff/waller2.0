import React from 'react';
import { render, waitFor, fireEvent } from 'react-native-testing-library';

import Dividends from '#pages/Dividends';

import apiMock from '../utils/ApiMock';

jest.mock('@react-navigation/native', () => {
  return {
    useFocusEffect: () => {},
  };
});

const dividends = [
  {
    id: '1',
    type: 'jscp',
    value: 1,
    EX_date: '09/09/2020',
    pay_date: '18/09/2020',
    active: {
      id: '1',
      code: 'PETR4',
      name: 'Petrobras',
      type: 'Acao',
      price: 10,
      last_price: 11,
    },
    quantity: 100,
  },
  {
    id: '2',
    type: 'jscp',
    value: 1,
    EX_date: '09/09/2020',
    pay_date: '18/09/2020',
    active: {
      id: '1',
      code: 'PETR4',
      name: 'Petrobras',
      type: 'Acao',
      price: 10,
      last_price: 11,
    },
    quantity: 100,
  },
];

const dividendsReceivable = {
  dividends,
  total: 100,
};

const dividendsMonthly = {
  dividends: [
    {
      month: 9,
      year: 2020,
      total: 100,
      dividends,
    },
  ],
  total: 100,
};

describe('Dividends page', () => {
  it('should be to render Dividends page without data', async () => {
    const { getByText, getByTestId } = render(<Dividends />);

    const dividendsReceivableButton = getByTestId('Dividends receivable');

    await waitFor(() => {
      expect(getByText('Dividends receivable')).toBeTruthy();
      expect(getByText('Dividends received')).toBeTruthy();
    });

    fireEvent.press(dividendsReceivableButton);

    await waitFor(() => {
      expect(getByText('Total')).toBeTruthy();
    });
  });

  it('should be to render Dividends page', async () => {
    apiMock.onGet('dividends/receivable').reply(200, dividendsReceivable);
    apiMock.onGet('dividends/monthly').reply(200, dividendsMonthly);

    const { getByText, getByTestId } = render(<Dividends />);

    const dividendsReceivableButton = getByTestId('Dividends receivable');
    const dividendsReceivedButton = getByTestId('Dividends received');

    await waitFor(() => {
      expect(getByText('Dividends receivable')).toBeTruthy();
      expect(getByText('Dividends received')).toBeTruthy();
    });

    fireEvent.press(dividendsReceivableButton);

    const closeButton = getByTestId('close-button');

    await waitFor(() => {
      expect(getByText('Total')).toBeTruthy();
    });

    fireEvent.press(closeButton);

    fireEvent.press(dividendsReceivedButton);

    await waitFor(() => {
      expect(getByText('Total')).toBeTruthy();
    });
  });
});
