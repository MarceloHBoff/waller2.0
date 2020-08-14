import React from 'react';
import { render, waitFor, fireEvent } from 'react-native-testing-library';

import CheckBox from '#pages/Config/CheckBox';

const onChange = jest.fn();

describe('Config checkbox component', () => {
  it('should be able to render Config checkbox', async () => {
    const selected = true;

    const { getByTestId } = render(
      <CheckBox selected={selected} onChange={onChange} />,
    );

    const checkBox = getByTestId('checkbox');

    await waitFor(() => {
      expect(checkBox).toBeTruthy();
    });

    fireEvent.press(checkBox);

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });
});
