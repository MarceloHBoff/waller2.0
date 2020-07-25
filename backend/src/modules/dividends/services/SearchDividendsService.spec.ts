import 'reflect-metadata';

import SearchDividendsService from './SearchDividendsService';

import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '@modules/actives/repositories/fakes/FakeUserActiveRepository';
import CreateActiveService from '@modules/actives/services/CreateActiveService';
import CreateUserActiveService from '@modules/actives/services/CreateUserActiveService';
import FakeGetDividendsProvider from '@modules/dividends/providers/GetDividendsProvider/fakes/FakeGetDividendsProvider';
import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeRefreshProvider: FakeRefreshProvider;
let fakeActivesRepository: FakeActivesRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let fakeGetDividendsProvider: FakeGetDividendsProvider;
let fakeDividendsRepository: FakeDividendsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;

let searchDividends: SearchDividendsService;

describe('ListUserDividendsReceivables', () => {
  beforeEach(() => {
    fakeRefreshProvider = new FakeRefreshProvider();
    fakeActivesRepository = new FakeActivesRepository();
    fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
      fakeRefreshProvider,
    );
    fakeGetDividendsProvider = new FakeGetDividendsProvider();
    fakeDividendsRepository = new FakeDividendsRepository();
    fakeUsersRepository = new FakeUsersRepository();

    searchDividends = new SearchDividendsService(
      fakeGetDividendsProvider,
      fakeActivesRepository,
      fakeDividendsRepository,
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

    await searchDividends.start();

    await searchDividends.execute('PETR3');
    await searchDividends.execute('ITUB3', active1.id);

    await searchDividends.finish();

    const dividends1 = await fakeDividendsRepository.findAllByActive(
      active1.id,
    );
    const dividends2 = await fakeDividendsRepository.findAllByActive(
      active2.id,
    );

    expect(dividends1[0].active_id).toBe(active1.id);
    expect(dividends1[1].active_id).toBe(active1.id);

    expect(dividends2[0].active_id).toBe(active2.id);
    expect(dividends2[1].active_id).toBe(active2.id);
  });
});
