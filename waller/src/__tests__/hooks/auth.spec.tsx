import { renderHook, act } from '@testing-library/react-hooks';

import MockAsyncStorage from 'mock-async-storage';

import { useAuth, AuthProvider } from '../../hooks/auth';
import apiMock from '../utils/ApiMock';

jest.mock(
  '@react-native-community/async-storage',
  () => new MockAsyncStorage(),
);

const apiResponse = {
  user: {
    id: '123456',
    name: 'John Doe',
    email: 'johndoe@example.com.br',
  },
  token: 'token',
};

apiMock.onPost('/sessions').reply(200, apiResponse);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signIn({
        email: 'johndoe@example.com.br',
        password: '123456',
      });
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
    expect(result.current.signed).toBe(true);
  });

  it('should be able to sign with touch ID', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signInByTouchId();
    });

    await waitForNextUpdate();

    expect(result.current.signed).toBe(true);
  });

  it('should be able to sign out', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signIn({
        email: 'johndoe@example.com.br',
        password: '123456',
      });
    });

    await waitForNextUpdate();

    act(() => {
      result.current.signOut();
    });

    await waitForNextUpdate();

    expect(result.current.signed).toBe(false);
  });
});
