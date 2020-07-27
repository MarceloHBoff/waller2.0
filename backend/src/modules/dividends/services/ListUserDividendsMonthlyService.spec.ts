import 'reflect-metadata';

import ListUserDividendsMonthlyService from './ListUserDividendsMonthlyService';

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

let listUserDividendsMonthly: ListUserDividendsMonthlyService;

describe('ListUserDividendsMonthly', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    fakeUserActiveRepository = createUserActiveRepository();

    initCreateActiveService();

    createUserActive = initCreateUserActiveService();

    fakeDividendsRepository = new FakeDividendsRepository();

    listUserDividendsMonthly = new ListUserDividendsMonthlyService(
      fakeDividendsRepository,
      fakeUserActiveRepository,
    );
  });

  it('should be able to list user dividends receivable', async () => {
    const { id } = await createUser();

    const { active1, active2 } = await createActives();

    const dateMock = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2019, 4, 1).getTime());

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
        EX_date: new Date(2019, 8, 10),
        pay_date: new Date(2019, 8, 10),
        value: 0.01,
      },
      {
        active_id: active1.id,
        type: 'dividends',
        EX_date: new Date(2020, 6, 10),
        pay_date: new Date(2020, 6, 10),
        value: 0.01,
      },
      {
        active_id: active1.id,
        type: 'dividends',
        EX_date: new Date(2020, 6, 12),
        pay_date: new Date(2020, 6, 12),
        value: 0.01,
      },
      {
        active_id: active2.id,
        type: 'dividends',
        EX_date: new Date(2020, 5, 10),
        pay_date: new Date(2020, 5, 10),
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
      .mockImplementation(() => new Date(2020, 7, 1).getTime());

    const dividends = await listUserDividendsMonthly.execute(id);

    expect(dividends.dividends.length).toBe(3);
    expect(dividends.dividends[0].month).toBe(9);
    expect(dividends.dividends[0].year).toBe(2019);
    expect(dividends.dividends[0].total).toBe(0.1);
    expect(dividends.dividends[1].month).toBe(6);
    expect(dividends.dividends[1].year).toBe(2020);
    expect(dividends.dividends[1].total).toBe(0.3);
    expect(dividends.dividends[2].month).toBe(7);
    expect(dividends.dividends[2].year).toBe(2020);
    expect(dividends.dividends[2].total).toBe(0.2);
    expect(dividends.dividends[0].dividends.length).toBe(1);
    expect(dividends.dividends[1].dividends.length).toBe(1);
    expect(dividends.dividends[2].dividends.length).toBe(2);
    expect(dividends.total).toBe(0.6000000000000001);
  });
});
