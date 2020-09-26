import 'reflect-metadata';

import ListUserDividendsReceivablesService from './ListUserDividendsReceivablesService';

import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';

import {
  createUserActiveRepository,
  initCreateActiveService,
  initCreateUserActiveService,
  createActiveRepository,
  createActives,
  createUserActives,
} from '@shared/infra/typeorm/tests/actives';
import { initCreateUser, createUser } from '@shared/infra/typeorm/tests/users';

let fakeUserActiveRepository;
let fakeDividendsRepository: FakeDividendsRepository;

let listUserDividendsReceivables: ListUserDividendsReceivablesService;

describe('ListUserDividendsReceivables', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    fakeUserActiveRepository = createUserActiveRepository();

    initCreateActiveService();

    initCreateUserActiveService();

    fakeDividendsRepository = new FakeDividendsRepository();

    listUserDividendsReceivables = new ListUserDividendsReceivablesService(
      fakeDividendsRepository,
      fakeUserActiveRepository,
    );
  });

  it('should be able to list user dividends receivable', async () => {
    const dateMock = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 1).getTime());

    dateMock.mockClear();

    const { id } = await createUser();

    const { active1, active2 } = await createActives();

    await createUserActives(id);

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

    const dividends = await listUserDividendsReceivables.execute(id);

    expect(dividends.dividends.length).toBe(3);
    expect(dividends.dividends[0].active_id).toBe(active1.id);
    expect(dividends.dividends[1].active_id).toBe(active1.id);
    expect(dividends.dividends[2].active_id).toBe(active2.id);
    expect(dividends.total).toBe(0.4);
  });
});
