import React from 'react';
import { ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../hooks/auth';
import Config from '../pages/Config';
import { Colors } from '../styles';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading && !signed) return <ActivityIndicator size={40} />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.grayDarker },
      }}
    >
      {signed ? (
        <Stack.Screen name="App" component={AppRoutes} />
      ) : (
        <Stack.Screen name="Auth" component={AuthRoutes} />
      )}

      <Stack.Screen name="Config" component={Config} />
    </Stack.Navigator>
  );
};

export default Routes;
