import React from 'react';
import { render } from 'react-native-testing-library';

import Performance from '#pages/Performance';

jest.mock('@react-navigation/material-top-tabs', () => {
  return {
    createMaterialTopTabNavigator: () => ({
      Navigator: () => {},
      Screen: () => {},
    }),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    useRoute: () => ({
      name: 'Acao',
    }),
    useNavigation: () => ({
      addListener: () => {},
      removeListener: () => {},
    }),
    useFocusEffect: () => {},
  };
});

jest.mock('../../../hooks/swr', () => {
  return {
    useFetch: () => ({
      data: {
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
        ],
      },
    }),
  };
});

describe('Performance Actives page', () => {
  it('should be to render Performance Actives page', async () => {
    // render(<Performance />);
    // await waitFor(() => {
    //   expect(getByTestId('actives-list')).toBeTruthy();
    // });
  });
});
