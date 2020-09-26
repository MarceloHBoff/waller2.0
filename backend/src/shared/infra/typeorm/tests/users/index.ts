import { container } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import CreateUserService from '@modules/users/services/CreateUserService';

export async function createUser(): Promise<User> {
  const createUserService = container.resolve(CreateUserService);

  const user = await createUserService.execute({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  });

  return user;
}
