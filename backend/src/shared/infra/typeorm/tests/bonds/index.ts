import { container } from 'tsyringe';

import UserBond from '@modules/bonds/infra/typeorm/entities/UserBond';
import CreateUserBondService from '@modules/bonds/services/CreateUserBondService';

export async function createUserBonds(
  user_id: string,
): Promise<{
  userBond1: UserBond;
  userBond2: UserBond;
}> {
  const createUserBond = container.resolve(CreateUserBondService);

  const userBond1 = await createUserBond.execute({
    user_id,
    name: 'Bond test 1',
    due_date: new Date(),
    buy_price: 1000.0,
    now_price: 1300.0,
  });

  const userBond2 = await createUserBond.execute({
    user_id,
    name: 'Bond test 2',
    due_date: new Date(),
    buy_price: 5000.0,
    now_price: 6100.0,
  });

  return { userBond1, userBond2 };
}
