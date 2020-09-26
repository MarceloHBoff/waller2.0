import ListUserDividendsMonthlyService from './ListUserDividendsMonthlyService';

import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeActivesRepository from '@modules/actives/repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '@modules/actives/repositories/fakes/FakeUserActiveRepository';
import FakeDividendsRepository from '@modules/dividends/repositories/fakes/FakeDividendsRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import { createUser } from '@shared/infra/typeorm/tests/users';

describe('ListUserDividendsMonthly', () => {
  it('should be able to list user dividends receivable', async () => {
    const { id } = await createUser();

    const fakeDividendsRepository = new FakeDividendsRepository();
    const fakeActivesRepository = new FakeActivesRepository();
    const fakeRefreshProvider = new FakeRefreshProvider();
    const fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
      fakeRefreshProvider,
    );
    const fakeCacheProvider = new FakeCacheProvider();

    const listUserDividendsMonthly = new ListUserDividendsMonthlyService(
      fakeDividendsRepository,
      fakeUserActiveRepository,
      fakeCacheProvider,
    );

    const active1 = await fakeActivesRepository.create('PETR3', 'Acao');
    const active2 = await fakeActivesRepository.create('ITUB3', 'Acao');

    const dateMock = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(2019, 4, 1).getTime());

    await fakeUserActiveRepository.create({
      user_id: id,
      type: 'Acao',
      buy_price: 100,
      code: 'PETR3',
      quantity: 10,
      buy_date: new Date(2019, 4, 1),
    });
    await fakeUserActiveRepository.create({
      user_id: id,
      type: 'Acao',
      buy_price: 10,
      code: 'ITUB3',
      quantity: 20,
      buy_date: new Date(2019, 4, 1),
    });
    await fakeUserActiveRepository.create({
      user_id: id,
      type: 'Acao',
      buy_price: 8,
      code: 'ITUB3',
      quantity: 10,
      buy_date: new Date(2019, 4, 1),
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

    const dividendsCached = await listUserDividendsMonthly.execute(id);

    expect(dividendsCached.dividends.length).toBe(3);
    expect(dividendsCached.dividends[0].month).toBe(9);
    expect(dividendsCached.dividends[0].year).toBe(2019);
    expect(dividendsCached.dividends[0].total).toBe(0.1);
    expect(dividendsCached.dividends[1].month).toBe(6);
    expect(dividendsCached.dividends[1].year).toBe(2020);
    expect(dividendsCached.dividends[1].total).toBe(0.3);
    expect(dividendsCached.dividends[2].month).toBe(7);
    expect(dividendsCached.dividends[2].year).toBe(2020);
    expect(dividendsCached.dividends[2].total).toBe(0.2);
    expect(dividendsCached.dividends[0].dividends.length).toBe(1);
    expect(dividendsCached.dividends[1].dividends.length).toBe(1);
    expect(dividendsCached.dividends[2].dividends.length).toBe(2);
    expect(dividendsCached.total).toBe(0.6000000000000001);
  });
});
