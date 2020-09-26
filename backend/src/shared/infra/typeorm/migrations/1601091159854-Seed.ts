import '@shared/container';

import { container } from 'tsyringe';
import { getConnection, MigrationInterface } from 'typeorm';

import UserActive from '@modules/actives/infra/typeorm/entities/UserActive';
import CreateActiveService from '@modules/actives/services/CreateActiveService';
import CreateUserActiveService from '@modules/actives/services/CreateUserActiveService';
import CreateUserBondService from '@modules/bonds/services/CreateUserBondService';
import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';

export class Seed1601091159854 implements MigrationInterface {
  public async up(): Promise<void> {
    const connection = getConnection().createQueryRunner();

    connection.startTransaction();

    let id = '';

    try {
      const createUser = container.resolve(CreateUserService);
      const userId = await createUser.execute({
        name: 'Demo',
        email: 'demo@demo.com.br',
        password: '123456',
      });
      id = userId.id;
    } catch {}

    const createActive = container.resolve(CreateActiveService);
    await createActive.execute('PETR4', '');
    await createActive.execute('ITUB3', '');
    await createActive.execute('WEGE3', '');
    await createActive.execute('VVAR3', '');
    await createActive.execute('MSFT', 'Stock');
    await createActive.execute('AAPL', 'Stock');
    await createActive.execute('BOVA11', 'ETF');
    await createActive.execute('KNRI11', 'FII');
    await createActive.execute('PSA', 'Reit');

    try {
      const createUserActive = container.resolve(CreateUserActiveService);
      await createUserActive.execute({
        user_id: id,
        buy_price: 20,
        code: 'PETR4',
        quantity: 100,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 30,
        code: 'ITUB3',
        quantity: 150,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 45,
        code: 'WEGE3',
        quantity: 100,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 11,
        code: 'VVAR3',
        quantity: 200,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 200,
        code: 'MSFT',
        quantity: 10,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 400,
        code: 'AAPL',
        quantity: 5,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 80,
        code: 'BOVA11',
        quantity: 10,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 100,
        code: 'KNRI11',
        quantity: 10,
      });
      await createUserActive.execute({
        user_id: id,
        buy_price: 150,
        code: 'PSA',
        quantity: 10,
      });
    } catch {}

    try {
      const createUserBond = container.resolve(CreateUserBondService);
      await createUserBond.execute({
        user_id: id,
        name: 'Bond test 1',
        due_date: new Date(2030, 9, 26),
        buy_price: 1000.0,
        now_price: 1300.0,
      });
      await createUserBond.execute({
        user_id: id,
        name: 'Bond test 2',
        due_date: new Date(2025, 4, 15),
        buy_price: 1500.0,
        now_price: 2300.0,
      });
    } catch {}

    connection.commitTransaction();
  }

  public async down(): Promise<void> {
    const connection = getConnection();

    const userRepo = connection.getRepository(User);
    const user = await userRepo.findOne({
      where: { email: 'demo@demo.com.br' },
    });

    const userActiveRepo = connection.getRepository(UserActive);

    if (user) {
      userActiveRepo.delete(user.id);
      userRepo.delete(user.id);
    }
  }
}
