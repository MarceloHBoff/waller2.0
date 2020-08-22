import { renderHook, act } from '@testing-library/react-hooks';

import { useConfig, ConfigProvider } from '../../hooks/config';

jest.mock('@react-native-community/async-storage', () => {
  const data: { [key: string]: string } = {
    '@Waller:values': 'false',
    '@Waller:finger': 'false',
  };

  return {
    setItem: (key: string, value: string) => {
      data[key] = value;
    },
    getItem: (key: string, func: (a: string, b: string) => void) => {
      func('', data[key]);
    },
  };
});

describe('Config hook', () => {
  it('should be able to set Config flags', async () => {
    const { result, rerender } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });

    expect(result.current.seeValues).toBe(false);
    expect(result.current.fingerPrint).toBe(false);

    act(() => {
      result.current.setSeeValues(true);
      result.current.setFingerPrint(true);
    });

    rerender();

    expect(result.current.seeValues).toBe(true);
    expect(result.current.fingerPrint).toBe(true);
  });
});
