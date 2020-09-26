import { container } from 'tsyringe';

import Active from '@modules/actives/infra/typeorm/entities/Active';
import UserActive from '@modules/actives/infra/typeorm/entities/UserActive';
import CreateActiveService from '@modules/actives/services/CreateActiveService';
import CreateUserActiveService from '@modules/actives/services/CreateUserActiveService';

export async function createActives(): Promise<{
  active1: Active;
  active2: Active;
}> {
  const createActive = container.resolve(CreateActiveService);

  const active1 = await createActive.execute('PETR3', 'Acao');
  const active2 = await createActive.execute('ITUB3', 'Acao');

  return { active1, active2 };
}

export async function createUserActives(
  user_id: string,
): Promise<{
  userActive1: UserActive;
  userActive2: UserActive;
}> {
  const createUserActive = container.resolve(CreateUserActiveService);

  const userActive1 = await createUserActive.execute({
    user_id,
    buy_price: 100,
    code: 'PETR3',
    quantity: 10,
  });

  const userActive2 = await createUserActive.execute({
    user_id,
    buy_price: 10,
    code: 'ITUB3',
    quantity: 20,
  });

  return { userActive1, userActive2 };
}
