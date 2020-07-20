import 'reflect-metadata';

import FakeUserBondRepository from '../../bonds/repositories/fakes/FakeBondsRepository';
import CreateUserBondService from '../../bonds/services/CreateUserBondService';
import FakeActivesRepository from '../repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';
import ListUserActivesService from './ListUserActivesService';

import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeUSDProvider from '@modules/actives/providers/USDProvider/fakes/FakeUSDProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeActivesRepository: FakeActivesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let fakeUserBondRepository: FakeUserBondRepository;
let fakeRefreshProvider: FakeRefreshProvider;
let fakeUSDProvider: FakeUSDProvider;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;
let createUserBond: CreateUserBondService;
let listUserActives: ListUserActivesService;

describe('ListUserActives', () => {
  beforeEach(() => {
    fakeActivesRepository = new FakeActivesRepository();

    fakeUsersRepository = new FakeUsersRepository();

    fakeUserBondRepository = new FakeUserBondRepository();

    fakeRefreshProvider = new FakeRefreshProvider();

    fakeUSDProvider = new FakeUSDProvider();

    fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
      fakeRefreshProvider,
    );

    createActive = new CreateActiveService(fakeActivesRepository);

    createUserActive = new CreateUserActiveService(fakeUserActiveRepository);

    createUserBond = new CreateUserBondService(fakeUserBondRepository);

    listUserActives = new ListUserActivesService(
      fakeUserActiveRepository,
      fakeUserBondRepository,
      fakeUSDProvider,
    );
  });

  it('should be able to list user actives', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await createActive.execute('PETR3', 'Acao');
    await createActive.execute('TEST', 'Invalid');
    await createActive.execute('ITUB3', 'Acao');
    await createActive.execute('MSFT', 'Stock');
    await createActive.execute('BOVA11', 'ETF');
    await createActive.execute('KNRI11', 'FII');
    await createActive.execute('PSA', 'Reit');

    await createUserBond.execute({
      user_id: id,
      name: 'Bond',
      buyPrice: 1000,
      dueDate: new Date(),
      nowPrice: 1200,
    });

    const userActive1 = await createUserActive.execute({
      user_id: id,
      buyPrice: 100,
      code: 'PETR3',
      quantity: 10,
    });

    const userActive2 = await createUserActive.execute({
      user_id: id,
      buyPrice: 80,
      code: 'ITUB3',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buyPrice: 200,
      code: 'MSFT',
      quantity: 1,
    });

    await createUserActive.execute({
      user_id: id,
      buyPrice: 90,
      code: 'BOVA11',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buyPrice: 150,
      code: 'KNRI11',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buyPrice: 160,
      code: 'PSA',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buyPrice: 10,
      code: 'TEST',
      quantity: 1,
    });

    const userActives = await listUserActives.execute(id);

    expect(userActives.actives[0].active_id).toBe(userActive1.active_id);
    expect(userActives.actives[1].active_id).toBe(userActive2.active_id);
    expect(userActives.types.Acao).toBe(2000);
    expect(userActives.types.Stock).toBe(500);
    expect(userActives.types.ETF).toBe(1000);
    expect(userActives.types.FII).toBe(1000);
    expect(userActives.types.Reit).toBe(5000);
    expect(userActives.types.Bond).toBe(1200);
    expect(userActives.totals.investment).toBe(14200);
    expect(userActives.totals.currentValue).toBe(10700);
  });
});
