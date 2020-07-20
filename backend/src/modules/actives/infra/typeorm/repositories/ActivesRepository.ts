import { injectable, inject } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';

import Active from '../entities/Active';

import IUpdateActiveDTO from '@modules/actives/dtos/IUpdateActiveDTO';
import IPriceProvider from '@modules/actives/providers/PriceProvider/models/IPriceProvider';
import IActivesRepository from '@modules/actives/repositories/IActivesRepository';

@injectable()
export default class ActivesRepository implements IActivesRepository {
  private ormRepository: Repository<Active>;

  constructor(
    @inject('PriceProvider')
    private priceProvider: IPriceProvider,
  ) {
    this.ormRepository = getRepository(Active);
  }

  public async findById(id: string): Promise<Active | undefined> {
    const findActive = await this.ormRepository.findOne(id);

    return findActive;
  }

  public async getById(id: string): Promise<Active> {
    const findActive = await this.ormRepository.findOneOrFail(id);

    return findActive;
  }

  public async findByCode(code: string): Promise<Active | undefined> {
    const findActive = await this.ormRepository.findOne({
      where: { code },
    });

    return findActive;
  }

  public async create(code: string, typeFixed: string): Promise<Active> {
    const {
      name,
      price,
      last_price,
      type,
    } = await this.priceProvider.getByCode(code);

    const active = this.ormRepository.create({
      code,
      name,
      type: typeFixed || type,
      price,
      last_price,
    });

    await this.ormRepository.save(active);

    return active;
  }

  public async updatePrice({
    id,
    price,
    last_price,
  }: IUpdateActiveDTO): Promise<Active> {
    const active: Active = await this.getById(id);

    active.price = price;
    active.last_price = last_price;

    await this.ormRepository.save(active);

    return active;
  }
}
