import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Nothing from '#pages/Performance/Nothing';

describe('Performance Nothing page', () => {
  it('should be to render Performance Nothing page', async () => {
    const { getByTestId } = render(<Nothing />);

    await waitFor(() => {
      expect(getByTestId('nothing')).toBeTruthy();
    });
  });
});
