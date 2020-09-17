import React from 'react';
import { render } from 'react-native-testing-library';

import Rentability from '#pages/Rentability';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      addListener: () => {},
      removeListener: () => {},
      useFocusEffect: () => {},
    }),
  };
});

describe('Rentability page', () => {
  it('should be to render Rentability page', async () => {
    render(<Rentability />);
  });
});
