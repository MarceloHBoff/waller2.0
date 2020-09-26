import 'reflect-metadata';
import { container } from 'tsyringe';

import '@modules/users/providers/fakes';
import '@modules/actives/providers/fakes';
import '@modules/dividends/providers/fakes';
import '../../container/providers/fakes';

import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeUserActivesRepository from '@modules/actives/repositories/fakes/FakeUserActiveRepository';
import IActivesRepository from '@modules/actives/repositories/IActivesRepository';
import IUserActivesRepository from '@modules/actives/repositories/IUserActivesRepository';
import FakeBondsRepository from '@modules/bonds/repositories/fakes/FakeBondsRepository';
import IUserBondsRepository from '@modules/bonds/repositories/IUserBondsRepository';
import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';
import IDividendsRepository from '@modules/dividends/repositories/IDividendsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  FakeUsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  FakeUserTokensRepository,
);

container.registerSingleton<IActivesRepository>(
  'ActivesRepository',
  FakeActivesRepository,
);

container.registerSingleton<IUserActivesRepository>(
  'UserActivesRepository',
  FakeUserActivesRepository,
);

container.registerSingleton<IUserBondsRepository>(
  'UserBondsRepository',
  FakeBondsRepository,
);

container.registerSingleton<IDividendsRepository>(
  'DividendsRepository',
  FakeDividendsRepository,
);
