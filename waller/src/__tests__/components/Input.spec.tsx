import React from 'react';
import { render, waitFor } from 'react-native-testing-library';

import { Form } from '@unform/core';

import Input from '#components/Input';

describe('Input component', () => {
  it('should be able to render Input', async () => {
    const { getByTestId } = render(
      <Form onSubmit={() => {}}>
        <Input testID="test" name="test" />
      </Form>,
    );

    getByTestId('test');

    await waitFor(() => {
      expect(getByTestId('test')).toBeTruthy();
    });
  });
});
