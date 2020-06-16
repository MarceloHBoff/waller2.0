import { container } from 'tsyringe';

import YahooPriceProvider from './PriceProvider/implementations/YahooPriceProvider';
import IPriceProvider from './PriceProvider/models/IPriceProvider';

container.registerSingleton<IPriceProvider>(
  'PriceProvider',
  YahooPriceProvider,
);
