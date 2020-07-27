import { initCreateUser, createUser } from '@tests/users/createUser';

import FakeCEICrawlerProvider from '../providers/CEICrawlerProvider/fakes/FakeCEICrawlerProvider';

import FindActivesByCEIService from './FindActivesByCEIService';

let fakeCEICrawler: FakeCEICrawlerProvider;

let findActivesByCEI: FindActivesByCEIService;

describe('FindActivesByCEI', () => {
  beforeEach(() => {
    initCreateUser();

    fakeCEICrawler = new FakeCEICrawlerProvider();

    findActivesByCEI = new FindActivesByCEIService(fakeCEICrawler);
  });

  it('should be able to find user actives by CEI', async () => {
    const { id } = await createUser();

    expect(findActivesByCEI.execute(id));
  });

  it('should be able to catch error if to occur', async () => {
    expect(await findActivesByCEI.execute('1')).toBeUndefined();
  });
});
