import { container } from 'tsyringe';

import FakeRefreshProvider from './RefreshProvider/fakes/FakeRefreshProvider';
import IRefreshProvider from './RefreshProvider/models/IRefreshProvider';
import FakeUSDProvider from './USDProvider/fakes/FakeUSDProvider';
import IUSDProvider from './USDProvider/models/IUSDProvider';

container.registerSingleton<IRefreshProvider>(
  'RefreshProvider',
  FakeRefreshProvider,
);

container.registerSingleton<IUSDProvider>('USDProvider', FakeUSDProvider);
