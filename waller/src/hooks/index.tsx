import React from 'react';

import { AuthProvider } from './auth';
import { ConfigProvider } from './config';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ConfigProvider>{children}</ConfigProvider>
  </AuthProvider>
);

export default AppProvider;
