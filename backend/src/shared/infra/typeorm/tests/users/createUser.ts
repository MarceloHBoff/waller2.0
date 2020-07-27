import User from '@modules/users/infra/typeorm/entities/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;

export function initCreateUser(): FakeUsersRepository {
  fakeUsersRepository = new FakeUsersRepository();

  return fakeUsersRepository;
}

export async function createUser(): Promise<User> {
  const user = await fakeUsersRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  });

  return user;
}
