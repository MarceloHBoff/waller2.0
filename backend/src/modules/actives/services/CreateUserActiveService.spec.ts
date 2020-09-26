import {
  createActives,
  createUserActives,
} from '@shared/infra/typeorm/tests/actives';
import { createUser } from '@shared/infra/typeorm/tests/users';

describe('CreateUserActive', () => {
  it('should be able to create a user active in database', async () => {
    const { id } = await createUser();

    await createActives();

    const { userActive1, userActive2 } = await createUserActives(id);

    expect(userActive1).toHaveProperty('id');
    expect(userActive2).toHaveProperty('id');
  });
});
