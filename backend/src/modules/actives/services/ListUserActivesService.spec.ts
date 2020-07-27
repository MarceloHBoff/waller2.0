import 'reflect-metadata';

import FakeUserBondRepository from '../../bonds/repositories/fakes/FakeBondsRepository';
import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';
import ListUserActivesService from './ListUserActivesService';

import FakeUSDProvider from '@modules/actives/providers/USDProvider/fakes/FakeUSDProvider';

import {
  createUserActiveRepository,
  createActiveRepository,
  initCreateActiveService,
  initCreateUserActiveService,
  createUserActives,
  createActives,
} from '@shared/infra/typeorm/tests/actives';
import {
  createBondRepository,
  initCreateUserBonds,
  createUserBonds,
} from '@shared/infra/typeorm/tests/bonds';
import { initCreateUser, createUser } from '@shared/infra/typeorm/tests/users';

let fakeUserActiveRepository: FakeUserActiveRepository;
let fakeUserBondRepository: FakeUserBondRepository;
let fakeUSDProvider: FakeUSDProvider;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;
let listUserActives: ListUserActivesService;

describe('ListUserActives', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    fakeUserActiveRepository = createUserActiveRepository();

    fakeUserBondRepository = createBondRepository();

    fakeUSDProvider = new FakeUSDProvider();

    initCreateUserBonds();

    createActive = initCreateActiveService();

    createUserActive = initCreateUserActiveService();

    listUserActives = new ListUserActivesService(
      fakeUserActiveRepository,
      fakeUserBondRepository,
      fakeUSDProvider,
    );
  });

  it('should be able to list user actives', async () => {
    const { id } = await createUser();

    await createActives();
    await createActive.execute('TEST', 'Invalid');
    await createActive.execute('MSFT', 'Stock');
    await createActive.execute('BOVA11', 'ETF');
    await createActive.execute('KNRI11', 'FII');
    await createActive.execute('PSA', 'Reit');

    await createUserBonds(id);

    const { userActive1, userActive2 } = await createUserActives(id);

    await createUserActive.execute({
      user_id: id,
      buy_price: 200,
      code: 'MSFT',
      quantity: 1,
    });

    await createUserActive.execute({
      user_id: id,
      buy_price: 90,
      code: 'BOVA11',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buy_price: 150,
      code: 'KNRI11',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buy_price: 160,
      code: 'PSA',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buy_price: 10,
      code: 'TEST',
      quantity: 1,
    });

    const userActives = await listUserActives.execute(id);

    expect(userActives.actives[0].active_id).toBe(userActive1.active_id);
    expect(userActives.actives[1].active_id).toBe(userActive2.active_id);
    expect(userActives.types.Acao).toBe(3000);
    expect(userActives.types.Stock).toBe(500);
    expect(userActives.types.ETF).toBe(1000);
    expect(userActives.types.FII).toBe(1000);
    expect(userActives.types.Reit).toBe(5000);
    expect(userActives.types.Bond).toBe(7400);
    expect(userActives.totals.investment).toBe(18600);
    expect(userActives.totals.currentValue).toBe(17900);
  });
});
