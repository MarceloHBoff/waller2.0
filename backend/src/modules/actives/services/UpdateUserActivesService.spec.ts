import { container } from 'tsyringe';

import UpdateUserActivesService from './UpdateUserActivesService';

import {
  createActives,
  createUserActives,
} from '@shared/infra/typeorm/tests/actives';
import { createUser } from '@shared/infra/typeorm/tests/users';

describe('UpdateUserActives', () => {
  it('should be able to update user actives', async () => {
    const { id } = await createUser();

    const updateUserActives = container.resolve(UpdateUserActivesService);

    await createActives();

    const { userActive1, userActive2 } = await createUserActives(id);

    const updatedActives = await updateUserActives.execute(id);

    expect(updatedActives[0]).toEqual(userActive1);
    expect(updatedActives[1]).toEqual(userActive2);
  });
});
