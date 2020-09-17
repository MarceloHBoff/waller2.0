import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Header, { HeaderText } from '#components/Header';

describe('Header component', () => {
  it('should be able to render Header', async () => {
    const { getByText, unmount } = render(
      <Header>
        <HeaderText>Test</HeaderText>
      </Header>,
    );

    await waitFor(() => {
      expect(getByText('Test')).toBeTruthy();
    });

    unmount();
  });
});
