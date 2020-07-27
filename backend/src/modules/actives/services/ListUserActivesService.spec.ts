import 'reflect-metadata';

import {
  initCreateUserActive,
  initCreateActiveService,
  createActiveRepository,
  createActives,
} from '@tests/actives/createUserActive';
import { initCreateUser, createUser } from '@tests/users/createUser';

import FakeUserBondRepository from '../../bonds/repositories/fakes/FakeBondsRepository';
import CreateUserBondService from '../../bonds/services/CreateUserBondService';
import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';
import ListUserActivesService from './ListUserActivesService';

import FakeUSDProvider from '@modules/actives/providers/USDProvider/fakes/FakeUSDProvider';

let fakeUserActiveRepository: FakeUserActiveRepository;
let fakeUserBondRepository: FakeUserBondRepository;
let fakeUSDProvider: FakeUSDProvider;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;
let createUserBond: CreateUserBondService;
let listUserActives: ListUserActivesService;

describe('ListUserActives', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    fakeUserBondRepository = new FakeUserBondRepository();

    fakeUSDProvider = new FakeUSDProvider();

    fakeUserActiveRepository = initCreateUserActive();

    createActive = initCreateActiveService();

    createUserActive = new CreateUserActiveService(fakeUserActiveRepository);

    createUserBond = new CreateUserBondService(fakeUserBondRepository);

    listUserActives = new ListUserActivesService(
      fakeUserActiveRepository,
      fakeUserBondRepository,
      fakeUSDProvider,
    );
  });

  it('should be able to list user actives', async () => {
    const { id } = await createUser();

    createActives();
    await createActive.execute('TEST', 'Invalid');
    await createActive.execute('MSFT', 'Stock');
    await createActive.execute('BOVA11', 'ETF');
    await createActive.execute('KNRI11', 'FII');
    await createActive.execute('PSA', 'Reit');

    await createUserBond.execute({
      user_id: id,
      name: 'Bond',
      buy_price: 1000,
      due_date: new Date(),
      now_price: 1200,
    });

    const userActive1 = await createUserActive.execute({
      user_id: id,
      buy_price: 100,
      code: 'PETR3',
      quantity: 10,
    });

    const userActive2 = await createUserActive.execute({
      user_id: id,
      buy_price: 80,
      code: 'ITUB3',
      quantity: 10,
    });

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
