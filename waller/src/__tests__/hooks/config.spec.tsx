import { renderHook, act } from '@testing-library/react-hooks';

import MockAsyncStorage from 'mock-async-storage';

import { useConfig, ConfigProvider } from '../../hooks/config';

jest.mock(
  '@react-native-community/async-storage',
  () => new MockAsyncStorage(),
);

describe('Config hook', () => {
  it('should be able to set Config flags', async () => {
    const { result, rerender } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });

    act(() => {
      result.current.setSeeValues(true);
      result.current.setFingerPrint(true);
    });

    expect(result.current.seeValues).toBe(true);
    expect(result.current.fingerPrint).toBe(true);

    rerender();

    expect(result.current.seeValues).toBe(true);
    expect(result.current.fingerPrint).toBe(true);
  });

  it('should be able to get Configs', async () => {
    const { result, rerender, waitFor } = renderHook(() => useConfig(), {
      wrapper: ConfigProvider,
    });

    waitFor(() => {});

    rerender();

    expect(result.current.seeValues).toBe(true);
    expect(result.current.fingerPrint).toBe(true);
  });
});
