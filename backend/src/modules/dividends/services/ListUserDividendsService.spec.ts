import 'reflect-metadata';

import ListUserDividendsService from './ListUserDividendsService';

import CreateUserActiveService from '@modules/actives/services/CreateUserActiveService';
import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';

import {
  initCreateActiveService,
  initCreateUserActiveService,
  createActiveRepository,
  createUserActiveRepository,
  createActives,
  createUserActives,
} from '@shared/infra/typeorm/tests/actives';
import { initCreateUser, createUser } from '@shared/infra/typeorm/tests/users';

let fakeUserActiveRepository;
let fakeDividendsRepository: FakeDividendsRepository;
let createUserActive: CreateUserActiveService;

let listUserDividends: ListUserDividendsService;

describe('ListUserDividends', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    fakeUserActiveRepository = createUserActiveRepository();

    initCreateActiveService();

    createUserActive = initCreateUserActiveService();

    fakeDividendsRepository = new FakeDividendsRepository();

    listUserDividends = new ListUserDividendsService(
      fakeDividendsRepository,
      fakeUserActiveRepository,
    );
  });

  it('should be able to list user dividends receivable', async () => {
    const { id } = await createUser();

    const { active1, active2 } = await createActives();

    const dateMock = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 1).getTime());

    await createUserActives(id);

    await createUserActive.execute({
      user_id: id,
      buy_price: 8,
      code: 'ITUB3',
      quantity: 10,
    });

    dateMock.mockClear();

    await fakeDividendsRepository.createMany([
      {
        active_id: active1.id,
        type: 'dividends',
        EX_date: new Date(2020, 8, 10),
        pay_date: new Date(2020, 8, 10),
        value: 0.01,
      },
      {
        active_id: active1.id,
        type: 'dividends',
        EX_date: new Date(2020, 8, 10),
        pay_date: new Date(2020, 8, 10),
        value: 0.01,
      },
      {
        active_id: active2.id,
        type: 'dividends',
        EX_date: new Date(2020, 8, 10),
        pay_date: new Date(2020, 8, 10),
        value: 0.01,
      },
      {
        active_id: active1.id,
        type: 'dividends',
        EX_date: new Date(2020, 7, 10),
        pay_date: new Date(2020, 7, 10),
        value: 0.01,
      },
      {
        active_id: active2.id,
        type: 'dividends',
        EX_date: new Date(2020, 7, 10),
        pay_date: new Date(2020, 7, 10),
        value: 0.01,
      },
    ]);

    jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 1).getTime());

    const dividends = await listUserDividends.execute(id);

    expect(dividends.dividends.length).toBe(2);
    expect(dividends.dividends[0].active_id).toBe(active1.id);
    expect(dividends.dividends[1].active_id).toBe(active2.id);
    expect(dividends.total).toBe(0.4);
  });
});
