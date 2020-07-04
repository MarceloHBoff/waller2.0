import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/actives/providers';
import './providers';

import ActivesRepository from '@modules/actives/infra/typeorm/repositories/ActivesRepository';
import UserActivesRepository from '@modules/actives/infra/typeorm/repositories/UserActivesRepository';
import IActivesRepository from '@modules/actives/repositories/IActivesRepository';
import IUserActivesRepository from '@modules/actives/repositories/IUserActivesRepository';
import UserBondsRepository from '@modules/bonds/infra/typeorm/repositories/UserBondsRepository';
import IUserBondsRepository from '@modules/bonds/repositories/IUserBondsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IActivesRepository>(
  'ActivesRepository',
  ActivesRepository,
);

container.registerSingleton<IUserActivesRepository>(
  'UserActivesRepository',
  UserActivesRepository,
);

container.registerSingleton<IUserBondsRepository>(
  'UserBondsRepository',
  UserBondsRepository,
);
