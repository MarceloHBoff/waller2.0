import { renderHook } from '@testing-library/react-hooks';

import { useFetch } from '../../hooks/swr';
import apiMock from '../utils/ApiMock';

const user = {
  id: '123456',
  name: 'John Doe',
  email: 'johndoe@example.com.br',
};

apiMock.onGet('/data').reply(200, { user });

describe('Swr hook', () => {
  it('should be able to get request with swr', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch('data'));

    await waitForNextUpdate();

    expect(result.current.data.user).toEqual(user);
  });
});
