import 'reflect-metadata';

import FakeActivesRepository from '../repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeActivesRepository: FakeActivesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;

describe('CreateUserActive', () => {
  beforeEach(() => {
    fakeActivesRepository = new FakeActivesRepository();

    fakeUsersRepository = new FakeUsersRepository();

    createActive = new CreateActiveService(fakeActivesRepository);

    fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
    );

    createUserActive = new CreateUserActiveService(fakeUserActiveRepository);
  });

  it('should be able to create a user active in database', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await createActive.execute('PETR3');

    const userActive = await createUserActive.execute({
      user_id: id,
      buyPrice: 100,
      code: 'PETR3',
      quantity: 10,
    });

    expect(userActive).toHaveProperty('id');
  });
});
