import 'reflect-metadata';

import FakeActivesRepository from '../repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';
import ListUserActivesService from './ListUserActivesService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeActivesRepository: FakeActivesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;
let listUserActives: ListUserActivesService;

describe('ListUserActives', () => {
  beforeEach(() => {
    fakeActivesRepository = new FakeActivesRepository();

    fakeUsersRepository = new FakeUsersRepository();

    createActive = new CreateActiveService(fakeActivesRepository);

    fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
    );

    createUserActive = new CreateUserActiveService(fakeUserActiveRepository);
    listUserActives = new ListUserActivesService(fakeUserActiveRepository);
  });

  it('should be able to list user actives', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await createActive.execute('PETR3');
    await createActive.execute('ITUB3');

    const userActive1 = await createUserActive.execute({
      user_id: id,
      buyPrice: 100,
      code: 'PETR3',
      quantity: 10,
    });

    const userActive2 = await createUserActive.execute({
      user_id: id,
      buyPrice: 100,
      code: 'PETR3',
      quantity: 10,
    });

    const userActives = await listUserActives.execute(id);

    expect(userActives).toHaveLength(2);
    expect(userActives[0].active_id).toBe(userActive1.active_id);
    expect(userActives[1].active_id).toBe(userActive2.active_id);
  });
});
