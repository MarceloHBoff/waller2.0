import FakeBondsRepository from '../repositories/fakes/FakeBondsRepository';

import CreateUserBondService from './CreateUserBondService';
import ListUserBondsService from './ListDividendsService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeBondsRepository: FakeBondsRepository;
let fakeUsersRepository: FakeUsersRepository;

let createUserBond: CreateUserBondService;
let listUserBonds: ListUserBondsService;

describe('ListDividends', () => {
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

    const userBonds = await listUserBonds.execute(id);

    expect(userBonds).toHaveLength(2);
    expect(userBonds[0].name).toBe(userBond1.name);
    expect(userBonds[1].name).toBe(userBond2.name);
  });
});