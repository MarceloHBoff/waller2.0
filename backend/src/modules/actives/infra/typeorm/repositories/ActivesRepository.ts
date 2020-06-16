import { injectable, inject } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';

import Active from '../entities/Active';

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

  public async findByCode(code: string): Promise<Active | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { code },
    });

    return findUser;
  }

  public async create(code: string): Promise<Active> {
    const { name, price, lastPrice, type } = await this.priceProvider.getByCode(
      code,
    );

    const user = this.ormRepository.create({
      code,
      name,
      type,
      price,
      lastPrice,
    });

    await this.ormRepository.save(user);

    return user;
  }
}
