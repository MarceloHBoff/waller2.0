import Active from '@modules/actives/infra/typeorm/entities/Active';
import UserActive from '@modules/actives/infra/typeorm/entities/UserActive';
import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '@modules/actives/repositories/fakes/FakeUserActiveRepository';
import CreateActiveService from '@modules/actives/services/CreateActiveService';
import CreateUserActiveService from '@modules/actives/services/CreateUserActiveService';

let fakeRefreshProvider: FakeRefreshProvider;
let fakeActivesRepository: FakeActivesRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;

export function createActiveRepository(): FakeActivesRepository {
  fakeActivesRepository = new FakeActivesRepository();

  return fakeActivesRepository;
}

export function createUserActiveRepository(): FakeUserActiveRepository {
  fakeRefreshProvider = new FakeRefreshProvider();

  fakeUserActiveRepository = new FakeUserActiveRepository(
    fakeActivesRepository,
    fakeRefreshProvider,
  );

  return fakeUserActiveRepository;
}

export function initCreateActiveService(): CreateActiveService {
  createActive = new CreateActiveService(fakeActivesRepository);

  return createActive;
}

export function initCreateUserActiveService(): CreateUserActiveService {
  createUserActive = new CreateUserActiveService(fakeUserActiveRepository);

  return createUserActive;
}

export async function createActives(): Promise<{
  active1: Active;
  active2: Active;
}> {
  const active1 = await createActive.execute('PETR3', 'Acao');
  const active2 = await createActive.execute('ITUB3', 'Acao');

  return { active1, active2 };
}

export async function createUserActives(
  user_id: string,
): Promise<{
  userActive1: UserActive;
  userActive2: UserActive;
}> {
  const userActive1 = await createUserActive.execute({
    user_id,
    buy_price: 100,
    code: 'PETR3',
    quantity: 10,
  });

  const userActive2 = await createUserActive.execute({
    user_id,
    buy_price: 10,
    code: 'ITUB3',
    quantity: 20,
  });

  return { userActive1, userActive2 };
}
