import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import Config from '#pages/Config';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      addListener: () => {},
      removeListener: () => {},
    }),
  };
});

jest.mock('../../hooks/config', () => {
  let seeValues = true;
  let fingerPrint = false;

  return {
    useConfig: () => ({
      seeValues,
      fingerPrint,
      setSeeValues: () => {
        seeValues = !seeValues;
      },
      setFingerPrint: () => {
        fingerPrint = !fingerPrint;
      },
    }),
  };
});

describe('Config page', () => {
  it('should be to render Config page', async () => {
    const { getByTestId, rerender } = render(<Config />);

    const seeValues = getByTestId('see-values');
    const fingerPrint = getByTestId('finger-print');

    fireEvent.press(seeValues);
    fireEvent.press(fingerPrint);

    rerender(<Config />);

    const seeValuesIcon = getByTestId('eye-icon');
    const fingerPrintIcon = getByTestId('finger-print-icon');

    expect(seeValuesIcon).toBeTruthy();
    expect(fingerPrintIcon).toBeTruthy();
  });
});
