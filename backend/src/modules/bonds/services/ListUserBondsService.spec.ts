import FakeBondsRepository from '../repositories/fakes/FakeBondsRepository';

import CreateUserBondService from './CreateUserBondService';
import ListUserBondsService from './ListUserBondsService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeBondsRepository: FakeBondsRepository;
let fakeUsersRepository: FakeUsersRepository;

let createUserBond: CreateUserBondService;
let listUserBonds: ListUserBondsService;

describe('ListUserBonds', () => {
  beforeEach(() => {
    fakeBondsRepository = new FakeBondsRepository();

    fakeUsersRepository = new FakeUsersRepository();

    createUserBond = new CreateUserBondService(fakeBondsRepository);

    listUserBonds = new ListUserBondsService(fakeBondsRepository);
  });

  it('should be able to list user bonds', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const userBond1 = await createUserBond.execute({
      user_id: id,
      name: 'Bond test 1',
      dueDate: new Date(),
      buyPrice: 1000.0,
      nowPrice: 1300.0,
    });

    const userBond2 = await createUserBond.execute({
      user_id: id,
      name: 'Bond test 2',
      dueDate: new Date(),
      buyPrice: 5000.0,
      nowPrice: 6100.0,
    });

    const userBonds = await listUserBonds.execute(id);

    expect(userBonds).toHaveLength(2);
    expect(userBonds[0].name).toBe(userBond1.name);
    expect(userBonds[1].name).toBe(userBond2.name);
  });
});
