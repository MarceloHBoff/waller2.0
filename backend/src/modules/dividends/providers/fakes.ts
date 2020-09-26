import { container } from 'tsyringe';

import FakeGetDividendsProvider from './GetDividendsProvider/fakes/FakeGetDividendsProvider';
import IGetDividendsProvider from './GetDividendsProvider/models/IGetDividendsProvider';

container.registerSingleton<IGetDividendsProvider>(
  'GetDividendsProvider',
  FakeGetDividendsProvider,
);
