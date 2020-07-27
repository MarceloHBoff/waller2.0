import 'reflect-metadata';

import {
  initCreateUserActive,
  initCreateActiveService,
  createActiveRepository,
  createActives,
} from '@tests/actives/createUserActive';
import { initCreateUser, createUser } from '@tests/users/createUser';

import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateUserActiveService from './CreateUserActiveService';

let fakeUserActiveRepository: FakeUserActiveRepository;
let createUserActive: CreateUserActiveService;

describe('CreateUserActive', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    fakeUserActiveRepository = initCreateUserActive();

    initCreateActiveService();

    createUserActive = new CreateUserActiveService(fakeUserActiveRepository);
  });

  it('should be able to create a user active in database', async () => {
    const { id } = await createUser();

    createActives();

    const userActive = await createUserActive.execute({
      user_id: id,
      buy_price: 100,
      code: 'PETR3',
      quantity: 10,
    });

    expect(userActive).toHaveProperty('id');
  });
});
