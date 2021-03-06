import {
  Repository,
  getRepository,
  MoreThan,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';

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
    const newDividends = [];

    for (let i = 0; i < dividends.length; i++) {
      const existDividend = await this.ormRepository.findOne(dividends[i]);

      if (existDividend) {
        break;
      }

      newDividends.push(dividends[i]);
    }

    const dividendsCreated = this.ormRepository.create(newDividends);

    await this.ormRepository.save(dividendsCreated);

    return dividendsCreated;
  }

  public async getDividendsReceivable(
    date: Date,
    active_id: string,
  ): Promise<Dividend[]> {
    const dividendsReceivable = await this.ormRepository.find({
      where: {
        active_id,
        EX_date: MoreThanOrEqual(date),
        pay_date: MoreThan(new Date(Date.now())),
      },
      relations: ['active'],
    });

    return dividendsReceivable;
  }

  public async getDividends(
    date: Date,
    active_id: string,
  ): Promise<Dividend[]> {
    const dividends = await this.ormRepository.find({
      where: {
        active_id,
        EX_date: MoreThanOrEqual(date),
        pay_date: LessThanOrEqual(new Date(Date.now())),
      },
      relations: ['active'],
    });

    return dividends;
  }
}
