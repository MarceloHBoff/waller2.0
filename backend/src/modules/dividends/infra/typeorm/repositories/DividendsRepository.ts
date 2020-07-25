import { Repository, getRepository, MoreThan, MoreThanOrEqual } from 'typeorm';

import Dividend from '../entities/Dividend';

import ICreateManyDTO from '@modules/dividends/dtos/ICreateManyDTO';
import IDividendRepository from '@modules/dividends/repositories/IDividendsRepository';

export default class DividendRepository implements IDividendRepository {
  private ormRepository: Repository<Dividend>;

  constructor() {
    this.ormRepository = getRepository(Dividend);
  }

  public async findAllByActive(active_id: string): Promise<Dividend[]> {
    const activeDividends = await this.ormRepository.find({ active_id });

    return activeDividends;
  }

  public async createMany(dividends: ICreateManyDTO[]): Promise<Dividend[]> {
    const dividendsCreated = this.ormRepository.create(dividends);

    await this.ormRepository.save(dividendsCreated);

    return dividendsCreated;
  }

  public async getDividendsReceivable(date: Date): Promise<Dividend[]> {
    const dividendsReceivable = await this.ormRepository.find({
      where: {
        EX_date: MoreThanOrEqual(date),
        pay_date: MoreThan(new Date(Date.now())),
      },
      relations: ['active'],
    });

    return dividendsReceivable;
  }
}
