import { container } from 'tsyringe';

import YahooPriceProvider from './PriceProvider/implementations/YahooPriceProvider';
import IPriceProvider from './PriceProvider/models/IPriceProvider';
import YahooRefreshProvider from './RefreshProvider/implementations/YahooRefreshProvider';
import IRefreshProvider from './RefreshProvider/models/IRefreshProvider';
import AwesomeApiProvider from './USDProvider/implementations/AwesomeApiProvider';
import IUSDProvider from './USDProvider/models/IUSDProvider';

container.registerSingleton<IPriceProvider>(
  'PriceProvider',
  YahooPriceProvider,
);

container.registerSingleton<IRefreshProvider>(
  'RefreshProvider',
  YahooRefreshProvider,
);

container.registerSingleton<IUSDProvider>('USDProvider', AwesomeApiProvider);
