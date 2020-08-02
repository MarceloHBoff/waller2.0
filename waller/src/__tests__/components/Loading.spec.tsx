import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Loading from '#components/Loading';

describe('Loading component', () => {
  it('should be able to render Loading', async () => {
    const { getByTestId } = render(<Loading />);

    await waitFor(() => {
      expect(getByTestId('loading')).toBeTruthy();
    });
  });
});
