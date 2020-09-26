import { createUserBonds } from '@shared/infra/typeorm/tests/bonds';
import { createUser } from '@shared/infra/typeorm/tests/users';

describe('CreateUserBond', () => {
  it('should be able to create user bonds', async () => {
    const { id } = await createUser();

    const { userBond1, userBond2 } = await createUserBonds(id);

    expect(userBond1.name).toBe('Bond test 1');
    expect(userBond2.name).toBe('Bond test 2');
  });
});
