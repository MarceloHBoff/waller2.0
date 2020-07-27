import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import { initCreateUser, createUser } from '@shared/infra/typeorm/tests/users';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = initCreateUser();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await createUser();

    await sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a reset token', async () => {
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

    const { id } = await createUser();

    await sendForgotPasswordEmail.execute({ email: 'johndoe@example.com' });

    expect(generate).toHaveBeenCalledWith(id);
  });
});
