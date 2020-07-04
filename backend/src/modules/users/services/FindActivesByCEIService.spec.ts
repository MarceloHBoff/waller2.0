import FakeCEICrawlerProvider from '../providers/CEICrawlerProvider/fakes/FakeCEICrawlerProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FindActivesByCEIService from './FindActivesByCEIService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCEICrawler: FakeCEICrawlerProvider;

let findActivesByCEI: FindActivesByCEIService;

describe('FindActivesByCEI', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCEICrawler = new FakeCEICrawlerProvider();

    findActivesByCEI = new FindActivesByCEIService(fakeCEICrawler);
  });

  it('should be able to find user actives by CEI', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(findActivesByCEI.execute(id));
  });

  it('should be able to catch error if to occur', async () => {
    expect(await findActivesByCEI.execute('1')).toBeUndefined();
  });
});
