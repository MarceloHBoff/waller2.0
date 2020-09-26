import { container } from 'tsyringe';

import AuthenticateUserService from './AuthenticateUserService';

import AppError from '@shared/errors/AppError';
import { createUser } from '@shared/infra/typeorm/tests/users';

let authenticateUser: AuthenticateUserService;
let userId: string;

describe('AuthenticateUser', () => {
  beforeAll(async () => {
    const { id } = await createUser();
    userId = id;

    authenticateUser = container.resolve(AuthenticateUserService);
  });

  it('should be able to authenticate', async () => {
    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user.id).toEqual(userId);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe2@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate without wrong password', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
