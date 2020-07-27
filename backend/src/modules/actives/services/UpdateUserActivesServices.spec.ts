import 'reflect-metadata';

import {
  initCreateUserActive,
  initCreateActiveService,
  createActiveRepository,
} from '@tests/actives/createUserActive';
import { initCreateUser, createUser } from '@tests/users/createUser';

import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';
import UpdateUserActivesService from './UpdateUserActivesService';

let fakeUserActiveRepository: FakeUserActiveRepository;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;
let updateUserActives: UpdateUserActivesService;

describe('ListUserActives', () => {
  beforeEach(() => {
    initCreateUser();

    createActiveRepository();

    fakeUserActiveRepository = initCreateUserActive();

    createActive = initCreateActiveService();

    createUserActive = new CreateUserActiveService(fakeUserActiveRepository);

    updateUserActives = new UpdateUserActivesService(fakeUserActiveRepository);
  });

  it('should be able to update user actives', async () => {
    const { id } = await createUser();

    await createActive.execute('PETR3', 'Acao');
    await createActive.execute('ITUB3', 'Acao');

    const userActive1 = await createUserActive.execute({
      user_id: id,
      buy_price: 100,
      code: 'PETR3',
      quantity: 10,
    });

    const userActive2 = await createUserActive.execute({
      user_id: id,
      buy_price: 100,
      code: 'ITUB3',
      quantity: 10,
    });

    const updatedActives = await updateUserActives.execute(id);

    expect(updatedActives[0]).toEqual(userActive1);
    expect(updatedActives[1]).toEqual(userActive2);
  });
});
