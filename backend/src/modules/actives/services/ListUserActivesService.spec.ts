import { container } from 'tsyringe';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';
import ListUserActivesService from './ListUserActivesService';

import { createUserBonds } from '@shared/infra/typeorm/tests/bonds';
import { createUser } from '@shared/infra/typeorm/tests/users';

describe('ListUserActives', () => {
  it('should be able to list user actives', async () => {
    const { id } = await createUser();

    const createActive = container.resolve(CreateActiveService);
    const createUserActive = container.resolve(CreateUserActiveService);
    const listUserActives = container.resolve(ListUserActivesService);

    await createActive.execute('PETR4', 'Acao');
    await createActive.execute('TEST', 'Invalid');
    await createActive.execute('MSFT', 'Stock');
    await createActive.execute('BOVA11', 'ETF');
    await createActive.execute('KNRI11', 'FII');
    await createActive.execute('PSA', 'Reit');

    await createUserBonds(id);

    const userActive1 = await createUserActive.execute({
      user_id: id,
      buy_price: 20,
      code: 'PETR4',
      quantity: 150,
    });

    const userActive2 = await createUserActive.execute({
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
    expect(userActives.types.Acao).toBe(15000);
    expect(userActives.types.Stock).toBe(500);
    expect(userActives.types.ETF).toBe(1000);
    expect(userActives.types.FII).toBe(1000);
    expect(userActives.types.Reit).toBe(5000);
    expect(userActives.types.Bond).toBe(7400);
    expect(userActives.totals.investment).toBe(20400);
    expect(userActives.totals.currentValue).toBe(29900);

    const userActivesByCache = await listUserActives.execute(id);

    expect(userActivesByCache.actives[0].active_id).toBe(userActive1.active_id);
    expect(userActivesByCache.actives[1].active_id).toBe(userActive2.active_id);
    expect(userActivesByCache.types.Acao).toBe(15000);
    expect(userActivesByCache.types.Stock).toBe(500);
    expect(userActivesByCache.types.ETF).toBe(1000);
    expect(userActivesByCache.types.FII).toBe(1000);
    expect(userActivesByCache.types.Reit).toBe(5000);
    expect(userActivesByCache.types.Bond).toBe(7400);
    expect(userActivesByCache.totals.investment).toBe(20400);
    expect(userActivesByCache.totals.currentValue).toBe(29900);
  });
});
