import CreateActiveService from './CreateActiveService';

import {
  createActiveRepository,
  initCreateActiveService,
} from '@shared/infra/typeorm/tests/actives';

let createActive: CreateActiveService;

describe('CreateActive', () => {
  beforeEach(() => {
    createActiveRepository();

    createActive = initCreateActiveService();
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
