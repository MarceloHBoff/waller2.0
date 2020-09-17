import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signed: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signInByTouchId(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@Waller:token',
        '@Waller:user',
      ]);

      await AsyncStorage.getItem('@Waller:signed', (_, value) => {
        if (value) {
          setSigned(JSON.parse(value));
        }
      });

      api.defaults.headers.authorization = `Bearer ${token}`;

      if (token && user) setData({ token, user: JSON.parse(user) });

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Waller:token', token],
      ['@Waller:user', JSON.stringify(user)],
      ['@Waller:signed', JSON.stringify(true)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });

    setSigned(true);
  }, []);

  const signInByTouchId = useCallback(async () => {
    if (process.env.NODE_ENV !== 'production')
      await AsyncStorage.setItem('@Waller:signed', JSON.stringify(true));

    setSigned(true);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.setItem('@Waller:signed', JSON.stringify(false));

    setSigned(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        loading,
        signIn,
        signInByTouchId,
        signOut,
        signed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
