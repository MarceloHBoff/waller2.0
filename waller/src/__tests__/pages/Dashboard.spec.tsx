import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import Dashboard from '#pages/Dashboard';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
      addListener: () => {},
      removeListener: () => {},
    }),
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      user: { name: 'test' },
    }),
  };
});

describe('Dashboard page', () => {
  it('should be to render Dashboard page at morning', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2020-08-21T09:00:00.000Z').getTime());

    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId('header-text').children[0]).toContain('Good morning');
  });

  it('should be to render Dashboard page at afternoon', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2020-08-21T16:00:00.000Z').getTime());

    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId('header-text').children[0]).toContain('Good afternoon');
  });

  it('should be to render Dashboard page at night', async () => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2020-08-21T23:00:00.000Z').getTime());

    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId('header-text').children[0]).toContain('Good night');
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
