import { container } from 'tsyringe';

import CreateUserService from './CreateUserService';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let createUser: CreateUserService;
let updateProfile: UpdateProfileService;
let userId: string;

describe('UpdateProfile', () => {
  beforeAll(async () => {
    createUser = container.resolve(CreateUserService);
    updateProfile = container.resolve(UpdateProfileService);

    const { id } = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    userId = id;
  });

  it('should be able to update the profile', async () => {
    const updatedUser = await updateProfile.execute({
      user_id: userId,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email ', async () => {
    await createUser.execute({
      name: 'Test 1',
      email: 'test@example.com',
      password: '123456',
    });

    const { id } = await createUser.execute({
      name: 'Test 2',
      email: 'test2@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: id,
        name: 'John Doe',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const updatedUser = await updateProfile.execute({
      user_id: userId,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    await expect(
      updateProfile.execute({
        user_id: userId,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    await expect(
      updateProfile.execute({
        user_id: userId,
        name: 'John Trê',
        email: 'johntre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
