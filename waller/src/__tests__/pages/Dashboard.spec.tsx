import React from 'react';
import { render } from 'react-native-testing-library';

import Dashboard from '#pages/Dashboard';

const mockedNavigate = jest.fn();
let mockedFocus: () => void;
let mockedBlur: () => void;
let mockedRemoveFocus: () => void;
let mockedRemoveBlur: () => void;

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
      addListener: (e: string, func: () => void) => {
        if (e === 'focus') mockedFocus = func;
        if (e === 'blur') mockedBlur = func;
      },
      removeListener: (e: string, func: () => void) => {
        if (e === 'focus') mockedRemoveFocus = func;
        if (e === 'blur') mockedRemoveBlur = func;
      },
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
  it('should be to render Dashboard page', async () => {
    render(<Dashboard />);
  });
});
