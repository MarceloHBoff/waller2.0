import 'reflect-metadata';

import FakeActivesRepository from '../repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';

import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeActivesRepository: FakeActivesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let fakeRefreshProvider: FakeRefreshProvider;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;

describe('CreateUserActive', () => {
  beforeEach(() => {
    fakeActivesRepository = new FakeActivesRepository();

    fakeUsersRepository = new FakeUsersRepository();

    fakeRefreshProvider = new FakeRefreshProvider();

    fakeUserActiveRepository = new FakeUserActiveRepository(
      fakeActivesRepository,
      fakeRefreshProvider,
    );

    createActive = new CreateActiveService(fakeActivesRepository);

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
