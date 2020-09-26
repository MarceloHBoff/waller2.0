import ListUserDividendsReceivablesService from './ListUserDividendsReceivablesService';

import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '@modules/actives/repositories/fakes/FakeUserActiveRepository';
import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import { createUser } from '@shared/infra/typeorm/tests/users';

describe('ListUserDividendsReceivables', () => {
  it('should be able to list user dividends receivable', async () => {
    const { id } = await createUser();

    const dateMock = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2020, 8, 1).getTime());

    dateMock.mockClear();

    const fakeDividendsRepository = new FakeDividendsRepository();
    const fakeActivesRepository = new FakeActivesRepository();
    const fakeRefreshProvider = new FakeRefreshProvider();
    const fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
      fakeRefreshProvider,
    );
    const fakeCacheProvider = new FakeCacheProvider();

    const listUserDividendsReceivables = new ListUserDividendsReceivablesService(
      fakeDividendsRepository,
      fakeUserActiveRepository,
      fakeCacheProvider,
    );

    const active1 = await fakeActivesRepository.create('PETR3', 'Acao');
    const active2 = await fakeActivesRepository.create('ITUB3', 'Acao');

    await fakeUserActiveRepository.create({
      user_id: id,
      type: 'Acao',
      buy_price: 100,
      code: 'PETR3',
      quantity: 10,
      buy_date: new Date(2020, 8, 1),
    });
    await fakeUserActiveRepository.create({
      user_id: id,
      type: 'Acao',
      buy_price: 10,
      code: 'ITUB3',
      quantity: 20,
      buy_date: new Date(2020, 8, 1),
    });

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

    const dividendsCached = await listUserDividendsReceivables.execute(id);

    expect(dividendsCached.dividends.length).toBe(3);
    expect(dividendsCached.dividends[0].active_id).toBe(active1.id);
    expect(dividendsCached.dividends[1].active_id).toBe(active1.id);
    expect(dividendsCached.dividends[2].active_id).toBe(active2.id);
    expect(dividendsCached.total).toBe(0.4);
  });
});
