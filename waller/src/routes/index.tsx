import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) return <ActivityIndicator />;

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
