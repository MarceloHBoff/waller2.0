import FakeActivesRepository from '../repositories/fakes/FakeActivesRepository';

import CreateActiveService from './CreateActiveService';

let fakeActivesRepository: FakeActivesRepository;
let createActive: CreateActiveService;

describe('CreateActive', () => {
  beforeEach(() => {
    fakeActivesRepository = new FakeActivesRepository();

    createActive = new CreateActiveService(fakeActivesRepository);
  });

  it('should be able to create a active in database', async () => {
    const active = await createActive.execute('PETR3', 'Acao');

    expect(active).toHaveProperty('id');
  });

  it('should be return active if exists without create new', async () => {
    await createActive.execute('PETR3', 'Acao');

    const active = await createActive.execute('PETR3', 'Acao');

    expect(active).toHaveProperty('id');
  });
});
