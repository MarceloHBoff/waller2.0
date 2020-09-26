import { container } from 'tsyringe';

import FakeCEICrawlerProvider from './CEICrawlerProvider/fakes/FakeCEICrawlerProvider';
import ICEICrawlerProvider from './CEICrawlerProvider/models/ICEICrawlerProvider';
import FakeHashProvider from './HashProvider/fakes/FakeHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', FakeHashProvider);

container.registerSingleton<ICEICrawlerProvider>(
  'CEICrawlerProvider',
  FakeCEICrawlerProvider,
);
