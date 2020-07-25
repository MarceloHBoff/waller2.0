import { container } from 'tsyringe';

import StatusInvestProvider from './GetDividendsProvider/implementations/StatusInvestProvider';
import IGetDividendsProvider from './GetDividendsProvider/models/IGetDividendsProvider';

container.registerSingleton<IGetDividendsProvider>(
  'GetDividendsProvider',
  StatusInvestProvider,
);
