import { container } from 'tsyringe';

import FindActivesByCEIService from './FindActivesByCEIService';

import { createUser } from '@shared/infra/typeorm/tests/users';

let findActivesByCEI: FindActivesByCEIService;
let userId: string;

describe('FindActivesByCEI', () => {
  beforeAll(async () => {
    const user = await createUser();
    userId = user.id;

    findActivesByCEI = container.resolve(FindActivesByCEIService);
  });

  it('should be able to find user actives by CEI', async () => {
    expect(findActivesByCEI.execute(userId, '', ''));
  });

  it('should be able to catch error if to occur', async () => {
    expect(await findActivesByCEI.execute('1', '', '')).toBeUndefined();
  });
});
