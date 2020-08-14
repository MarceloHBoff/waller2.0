import React from 'react';
import { render } from 'react-native-testing-library';

import Config from '#pages/Config';

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

describe('Config page', () => {
  it('should be to render Config page', async () => {
    render(<Config />);
  });
});
