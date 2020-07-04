import { container } from 'tsyringe';

import YahooPriceProvider from './PriceProvider/implementations/YahooPriceProvider';
import IPriceProvider from './PriceProvider/models/IPriceProvider';
import YahooRefreshProvider from './RefreshProvider/implementations/YahooRefreshProvider';
import IRefreshProvider from './RefreshProvider/models/IRefreshProvider';

container.registerSingleton<IPriceProvider>(
  'PriceProvider',
  YahooPriceProvider,
);

container.registerSingleton<IRefreshProvider>(
  'RefreshProvider',
  YahooRefreshProvider,
);
