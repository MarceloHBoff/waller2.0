import 'reflect-metadata';

import ListUserDividendsReceivablesService from './ListUserDividendsReceivablesService';

import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '@modules/actives/repositories/fakes/FakeUserActiveRepository';
import CreateActiveService from '@modules/actives/services/CreateActiveService';
import CreateUserActiveService from '@modules/actives/services/CreateUserActiveService';
import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeRefreshProvider: FakeRefreshProvider;
let fakeActivesRepository: FakeActivesRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let fakeDividendsRepository: FakeDividendsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;

let listUserDividendsReceivables: ListUserDividendsReceivablesService;

describe('ListUserDividendsReceivables', () => {
  beforeEach(() => {
    fakeRefreshProvider = new FakeRefreshProvider();
    fakeActivesRepository = new FakeActivesRepository();
    fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
      fakeRefreshProvider,
    );
    fakeDividendsRepository = new FakeDividendsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    listUserDividendsReceivables = new ListUserDividendsReceivablesService(
      fakeDividendsRepository,
      fakeUserActiveRepository,
    );

    createActive = new CreateActiveService(fakeActivesRepository);

    createUserActive = new CreateUserActiveService(fakeUserActiveRepository);
  });

  it('should be able to list user dividends receivable', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const active1 = await createActive.execute('PETR3', 'Acao');
    const active2 = await createActive.execute('ITUB3', 'Acao');

    const dateMock = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 1).getTime());

    await createUserActive.execute({
      user_id: id,
      buy_price: 100,
      code: 'PETR3',
      quantity: 10,
    });

    await createUserActive.execute({
      user_id: id,
      buy_price: 10,
      code: 'ITUB3',
      quantity: 20,
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

    const dividends = await listUserDividendsReceivables.execute(id);

    expect(dividends.dividends.length).toBe(3);
    expect(dividends.dividends[0].active_id).toBe(active1.id);
    expect(dividends.dividends[1].active_id).toBe(active1.id);
    expect(dividends.dividends[2].active_id).toBe(active2.id);
    expect(dividends.total).toBe(0.4);
  });
});
