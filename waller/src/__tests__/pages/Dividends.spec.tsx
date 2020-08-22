import React from 'react';
import { render } from 'react-native-testing-library';

import Dividends from '#pages/Dividends';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      addListener: () => {},
      removeListener: () => {},
    }),
  };
});

describe('Dividends page', () => {
  it('should be to render Dividends page', async () => {
    render(<Dividends />);
  });
});
