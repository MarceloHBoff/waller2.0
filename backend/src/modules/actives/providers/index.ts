import { container } from 'tsyringe';

import PuppeteerProvider from './CEICrawlerProvider/implementations/PuppeteerProvider';
import ICEICrawlerProvider from './CEICrawlerProvider/models/ICEICrawlerProvider';
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

container.registerSingleton<ICEICrawlerProvider>(
  'CEICrawlerProvider',
  PuppeteerProvider,
);
