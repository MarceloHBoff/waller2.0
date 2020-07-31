import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface ConfigContextData {
  seeValues: boolean;
  fingerPrint: boolean;
  setSeeValues(data: boolean): void;
  setFingerPrint(data: boolean): void;
}

const ConfigContext = createContext<ConfigContextData>({} as ConfigContextData);

const ConfigProvider: React.FC = ({ children }) => {
  const [seeValues, setSeeValuesState] = useState(true);
  const [fingerPrint, setFingerPrintState] = useState(false);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      await AsyncStorage.getItem('@Waller:values', (_, value) => {
        if (value) {
          setSeeValuesState(JSON.parse(value));
        }
      });

      await AsyncStorage.getItem('@Waller:finger', (_, value) => {
        if (value) {
          setFingerPrintState(JSON.parse(value));
        }
      });
    }

    loadStorageData();
  }, []);

  const setSeeValues = useCallback(async data => {
    setSeeValuesState(data);

    await AsyncStorage.setItem('@Waller:values', JSON.stringify(data));
  }, []);

  const setFingerPrint = useCallback(async data => {
    setFingerPrintState(data);

    await AsyncStorage.setItem('@Waller:finger', JSON.stringify(data));
  }, []);

  return (
    <ConfigContext.Provider
      value={{ seeValues, fingerPrint, setSeeValues, setFingerPrint }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

function useConfig(): ConfigContextData {
  return useContext(ConfigContext);
}

export { ConfigProvider, useConfig };
