import 'reflect-metadata';

import FakeActivesRepository from '../repositories/fakes/FakeActivesRepository';
import FakeUserActiveRepository from '../repositories/fakes/FakeUserActiveRepository';

import CreateActiveService from './CreateActiveService';
import CreateUserActiveService from './CreateUserActiveService';
import UpdateUserActivesService from './UpdateUserActivesService';

import FakeRefreshProvider from '@modules/actives/providers/RefreshProvider/fakes/FakeRefreshProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeActivesRepository: FakeActivesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserActiveRepository: FakeUserActiveRepository;
let fakeRefreshProvider: FakeRefreshProvider;
let createActive: CreateActiveService;
let createUserActive: CreateUserActiveService;
let updateUserActives: UpdateUserActivesService;

describe('ListUserActives', () => {
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

    updateUserActives = new UpdateUserActivesService(fakeUserActiveRepository);
  });

  it('should be able to update user actives', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

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
