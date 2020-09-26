import FakeGetDividendsProvider from '../providers/GetDividendsProvider/fakes/FakeGetDividendsProvider';

import SearchDividendsService from './SearchDividendsService';

import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

describe('SearchDividends', () => {
  it('should be able to search active dividends', async () => {
    const fakeGetDividendsProvider = new FakeGetDividendsProvider();
    const fakeActivesRepository = new FakeActivesRepository();
    const fakeDividendsRepository = new FakeDividendsRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const searchDividends = new SearchDividendsService(
      fakeGetDividendsProvider,
      fakeActivesRepository,
      fakeDividendsRepository,
      fakeCacheProvider,
    );

    const active1 = await fakeActivesRepository.create('PETR3', 'Acao');
    const active2 = await fakeActivesRepository.create('ITUB3', 'Acao');

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
