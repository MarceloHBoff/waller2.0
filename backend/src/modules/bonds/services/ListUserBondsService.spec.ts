import { container } from 'tsyringe';

import ListUserBondsService from './ListUserBondsService';

import { createUserBonds } from '@shared/infra/typeorm/tests/bonds';
import { createUser } from '@shared/infra/typeorm/tests/users';

let listUserBonds: ListUserBondsService;

describe('ListUserBonds', () => {
  beforeEach(() => {
    listUserBonds = container.resolve(ListUserBondsService);
  });

  it('should be able to list user bonds', async () => {
    const { id } = await createUser();

    const { userBond1, userBond2 } = await createUserBonds(id);

    const userBonds = await listUserBonds.execute(id);

    expect(userBonds).toHaveLength(2);
    expect(userBonds[0].name).toBe(userBond1.name);
    expect(userBonds[1].name).toBe(userBond2.name);
  });
});
