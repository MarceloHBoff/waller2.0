import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import Dashboard from '#pages/Dashboard';

import apiMock from '../utils/ApiMock';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useFocusEffect: () => {},
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: { name: 'test' },
    }),
  };
});

const data = {
  types: {
    Acao: 1000,
    Stock: 1000,
    ETF: 100,
    FII: 200,
    Reit: 3000,
    Bond: 5310,
  },
  totals: {
    investment: 30000,
    currentValue: 6300,
    percent: 7410,
  },
};

apiMock.onGet('/userActives').reply(200, data);

describe('Dashboard page', () => {
  it('should be to render Dashboard page at morning', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2020-08-21T09:00:00.000Z').getTime());

    const { getByTestId } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByTestId('header-text').children[0]).toContain('Good morning');
    });
  });

  it('should be to render Dashboard page at afternoon', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2020-08-21T16:00:00.000Z').getTime());

    const { getByTestId } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByTestId('header-text').children[0]).toContain(
        'Good afternoon',
      );
    });
  });

  it('should be to render Dashboard page at night', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2020-08-21T23:00:00.000Z').getTime());

    const { getByTestId } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByTestId('header-text').children[0]).toContain('Good night');
    });
  });

  it('should be to navigate to config', async () => {
    const { getByTestId } = render(<Dashboard />);

    const configButton = getByTestId('config');

    fireEvent.press(configButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Config');
    });
  });
});
