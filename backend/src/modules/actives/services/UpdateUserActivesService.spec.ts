import 'reflect-metadata';

import UpdateUserActivesService from './UpdateUserActivesService';

import {
  initCreateActiveService,
  initCreateUserActiveService,
  createActiveRepository,
  createUserActiveRepository,
  createActives,
  createUserActives,
} from '@shared/infra/typeorm/tests/actives';
import { initCreateUser, createUser } from '@shared/infra/typeorm/tests/users';

let fakeUserActiveRepository;
let updateUserActives: UpdateUserActivesService;

describe('UpdateUserActives', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    initCreateActiveService();

    fakeUserActiveRepository = createUserActiveRepository();

    initCreateUserActiveService();

    updateUserActives = new UpdateUserActivesService(fakeUserActiveRepository);
  });

  it('should be able to update user actives', async () => {
    const { id } = await createUser();

    await createActives();

    const { userActive1, userActive2 } = await createUserActives(id);

    const updatedActives = await updateUserActives.execute(id);

    expect(updatedActives[0]).toEqual(userActive1);
    expect(updatedActives[1]).toEqual(userActive2);
  });
});
