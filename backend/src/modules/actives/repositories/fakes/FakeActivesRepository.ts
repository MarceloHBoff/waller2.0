import { uuid } from 'uuidv4';

import Active from '../../infra/typeorm/entities/Active';
import IActivesRepository from '../IActivesRepository';

import IUpdateActiveDTO from '@modules/actives/dtos/IUpdateActiveDTO';

export default class FakeActivesRepository implements IActivesRepository {
  private actives: Active[] = [];

  public async findById(id: string): Promise<Active | undefined> {
    const findActive = this.actives.find(active => active.id === id);

    return findActive;
  }

  public async getById(id: string): Promise<Active> {
    const findActive = this.actives.find(active => active.id !== id);

    return findActive || this.actives[0];
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

  public async updatePrice({
    id,
    price,
    lastPrice,
  }: IUpdateActiveDTO): Promise<Active> {
    const active: Active = await this.getById(id);

    this.actives.map(actives =>
      actives.id === id ? { ...actives, price, lastPrice } : actives,
    );

    active.price = price;
    active.lastPrice = lastPrice;

    return active;
  }
}
