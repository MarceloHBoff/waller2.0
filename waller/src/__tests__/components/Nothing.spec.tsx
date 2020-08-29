import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import Nothing from '#components/Nothing';

describe('Performance Nothing page', () => {
  it('should be to render Performance Nothing page', async () => {
    const { getByTestId } = render(<Nothing text="test" />);

    await waitFor(() => {
      expect(getByTestId('nothing')).toBeTruthy();
    });
  });
});
