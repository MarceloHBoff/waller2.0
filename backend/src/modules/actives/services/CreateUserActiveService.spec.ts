import 'reflect-metadata';

import CreateUserActiveService from './CreateUserActiveService';

import {
  initCreateActiveService,
  initCreateUserActiveService,
  createUserActiveRepository,
  createActiveRepository,
  createActives,
} from '@shared/infra/typeorm/tests/actives';
import { initCreateUser, createUser } from '@shared/infra/typeorm/tests/users';

let createUserActive: CreateUserActiveService;

describe('CreateUserActive', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    createUserActiveRepository();

    initCreateActiveService();

    createUserActive = initCreateUserActiveService();
  });

  it('should be able to create a user active in database', async () => {
    const { id } = await createUser();

    await createActives();

    const userActive = await createUserActive.execute({
      user_id: id,
      buy_price: 100,
      code: 'PETR3',
      quantity: 10,
    });

    expect(userActive).toHaveProperty('id');
  });
});
