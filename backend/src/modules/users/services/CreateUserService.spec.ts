import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import { createUser } from '@shared/infra/typeorm/tests/users';

let user: User;

describe('CreateUser', () => {
  beforeAll(async () => {
    user = await createUser();
  });

  it('should be able to create a new user', async () => {
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await expect(createUser()).rejects.toBeInstanceOf(AppError);
  });
});
