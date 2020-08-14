import { renderHook, act } from '@testing-library/react-hooks';

import AxiosMock from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new AxiosMock(api);

jest.mock('@react-native-community/async-storage', () => {
  return {
    getItem: () => {},
    multiGet: () => {},
    multiSet: () => {},
    setItem: () => {},
  };
});

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: '123456',
        name: 'John Doe',
        email: 'johndoe@example.com.br',
      },
      token: 'token',
    };

    apiMock.onPost('/sessions').reply(200, apiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  // it('should restore saved data from storage when auth inits', () => {
  //   jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
  //     switch (key) {
  //       case '@Waller:token':
  //         return 'token';
  //       case '@Waller:user':
  //         return JSON.stringify({
  //           id: '123456',
  //           name: 'John Doe',
  //           email: 'johndoe@example.com.br',
  //         });
  //       default:
  //         return null;
  //     }
  //   });

  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: AuthProvider,
  //   });

  //   expect(result.current.user.email).toEqual('johndoe@example.com.br');
  // });

  // it('should be able to sign out', async () => {
  //   jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
  //     switch (key) {
  //       case '@Waller:token':
  //         return 'token';
  //       case '@Waller:user':
  //         return JSON.stringify({
  //           id: '123456',
  //           name: 'John Doe',
  //           email: 'johndoe@example.com.br',
  //         });
  //       default:
  //         return null;
  //     }
  //   });

  //   const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

  //   const { result } = renderHook(() => useAuth(), {
  //     wrapper: AuthProvider,
  //   });

  //   act(() => {
  //     result.current.signOut();
  //   });

  //   expect(result.current.user).toBeUndefined();
  //   expect(removeItemSpy).toHaveBeenCalledTimes(2);
  // });
});
