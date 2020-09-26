import { container } from 'tsyringe';

import ShowProfileService from '@modules/users/services/ShowProfileService';

import AppError from '@shared/errors/AppError';
import { createUser } from '@shared/infra/typeorm/tests/users';

let showProfile: ShowProfileService;
let userId: string;

describe('UpdateProfile', () => {
  beforeAll(async () => {
    const { id } = await createUser();
    userId = id;

    showProfile = container.resolve(ShowProfileService);
  });

  it('should be able to show the profile', async () => {
    const profile = await showProfile.execute(userId);

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
