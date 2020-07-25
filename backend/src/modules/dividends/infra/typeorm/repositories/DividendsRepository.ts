import { Repository, getRepository, getConnection } from 'typeorm';

import Dividend from '../entities/Dividend';

import ICreateManyDTO from '@modules/dividends/dtos/ICreateManyDTO';
import IDividendRepository from '@modules/dividends/repositories/IDividendsRepository';

export default class DividendRepository implements IDividendRepository {
  private ormRepository: Repository<Dividend>;

  private connection = getConnection().createQueryRunner();

  constructor() {
    this.ormRepository = getRepository(Dividend);
  }

  public async create(active_id: string): Promise<Dividend> {
    const dividend = this.ormRepository.create({ active_id });

    await this.ormRepository.save(dividend);

    return dividend;
  }

  public async findAllByActive(active_id: string): Promise<Dividend[]> {
    const activeDividends = await this.ormRepository.find({ active_id });

    return activeDividends;
  }

  public async createMany(dividends: ICreateManyDTO[]): Promise<Dividend[]> {
    console.log(dividends);
    const dividendsCreated = this.ormRepository.create(dividends);

    await this.ormRepository.save(dividendsCreated);

    return dividendsCreated;
  }
}
