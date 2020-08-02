import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Header, { HeaderText } from '#components/Header';

let mockedFocus: () => void;
let mockedBlur: () => void;
let mockedRemoveFocus: () => void;
let mockedRemoveBlur: () => void;

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
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

describe('Header component', () => {
  it('should be able to render Header', async () => {
    const { getByText, unmount } = render(
      <Header>
        <HeaderText>Test</HeaderText>
      </Header>,
    );

    mockedFocus();
    mockedBlur();

    await waitFor(() => {
      expect(getByText('Test')).toBeTruthy();
    });

    unmount();

    mockedRemoveFocus();
    mockedRemoveBlur();
  });
});
