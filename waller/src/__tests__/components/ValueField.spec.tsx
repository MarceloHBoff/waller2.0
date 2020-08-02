import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import ValueField from '#components/ValueField';

describe('ValueField component', () => {
  it('should be able to render ValueField', async () => {
    const { getByText } = render(<ValueField>Test</ValueField>);

    await waitFor(() => {
      expect(getByText('Test')).toBeTruthy();
    });
  });
});
