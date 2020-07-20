import FakeBondsRepository from '../repositories/fakes/FakeBondsRepository';

import CreateUserBondService from './CreateUserBondService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeBondsRepository: FakeBondsRepository;
let fakeUsersRepository: FakeUsersRepository;

let createUserBond: CreateUserBondService;

describe('CreateUserBond', () => {
  beforeEach(() => {
    fakeBondsRepository = new FakeBondsRepository();

    fakeUsersRepository = new FakeUsersRepository();

    createUserBond = new CreateUserBondService(fakeBondsRepository);
  });

  it('should be able to create user bonds', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userBond1 = await createUserBond.execute({
      user_id: id,
      name: 'Bond test 1',
      due_date: new Date(),
      buy_price: 1000.0,
      now_price: 1300.0,
    });

    const userBond2 = await createUserBond.execute({
      user_id: id,
      name: 'Bond test 2',
      due_date: new Date(),
      buy_price: 5000.0,
      now_price: 6100.0,
    });

    expect(userBond1.name).toBe('Bond test 1');
    expect(userBond2.name).toBe('Bond test 2');
  });
});
