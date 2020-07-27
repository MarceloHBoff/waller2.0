import 'reflect-metadata';

import SearchDividendsService from './SearchDividendsService';

import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeGetDividendsProvider from '@modules/dividends/providers/GetDividendsProvider/fakes/FakeGetDividendsProvider';
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

let fakeActivesRepository: FakeActivesRepository;
let fakeGetDividendsProvider: FakeGetDividendsProvider;
let fakeDividendsRepository: FakeDividendsRepository;

let searchDividends: SearchDividendsService;

describe('SearchDividends', () => {
  beforeEach(() => {
    initCreateUser();

    fakeActivesRepository = createActiveRepository();

    createUserActiveRepository();

    initCreateActiveService();

    initCreateUserActiveService();

    fakeGetDividendsProvider = new FakeGetDividendsProvider();

    fakeDividendsRepository = new FakeDividendsRepository();

    searchDividends = new SearchDividendsService(
      fakeGetDividendsProvider,
      fakeActivesRepository,
      fakeDividendsRepository,
    );
  });

  it('should be able to search active dividends', async () => {
    const { id } = await createUser();

    const { active1, active2 } = await createActives();

    await createUserActives(id);

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
