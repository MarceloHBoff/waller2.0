import { uuid } from 'uuidv4';

import Active from '../../infra/typeorm/entities/Active';
import IActivesRepository from '../IActivesRepository';

export default class FakeActivesRepository implements IActivesRepository {
  private actives: Active[] = [];

  public async findById(id: string): Promise<Active | undefined> {
    const findActive = this.actives.find(active => active.id === id);

    return findActive;
  }

  public async findByCode(code: string): Promise<Active | undefined> {
    const findActive = this.actives.find(active => active.code === code);

    return findActive;
  }

  public async create(code: string): Promise<Active> {
    const active = new Active();

    Object.assign(active, {
      id: uuid(),
      name: 'Name',
      type: 'Acao',
      price: 100,
      lastPrice: 90,
      code,
    });

    this.actives.push(active);

    return active;
  }
}
