import { createActives } from '@shared/infra/typeorm/tests/actives';

describe('CreateActive', () => {
  it('should be able to create a active in database', async () => {
    const { active1, active2 } = await createActives();

    expect(active1).toHaveProperty('id');
    expect(active2).toHaveProperty('id');
  });

  it('should be return active if exists without create new', async () => {
    await createActives();

    const { active1, active2 } = await createActives();

    expect(active1).toHaveProperty('id');
    expect(active2).toHaveProperty('id');
  });
});
