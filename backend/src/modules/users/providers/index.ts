import { container } from 'tsyringe';

import PuppeteerProvider from './CEICrawlerProvider/implementations/PuppeteerProvider';
import ICEICrawlerProvider from './CEICrawlerProvider/models/ICEICrawlerProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ICEICrawlerProvider>(
  'CEICrawlerProvider',
  PuppeteerProvider,
);
