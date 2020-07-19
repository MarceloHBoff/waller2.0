import useSWR from 'swr';

import api from '../services/api';

export function useFetch<Data = any, Error = any>(
  url: string,
): {
  data: Data | undefined;
  mutate(data: Data): Promise<Data | undefined>;
  error: Error | undefined;
} {
  const { data, mutate, error } = useSWR<Data, Error>(url, async endPoint => {
    const response = await api.get(endPoint);

    return response.data;
  });

  return { data, mutate, error };
}
