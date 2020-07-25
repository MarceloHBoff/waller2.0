import { uuid } from 'uuidv4';

import IDividendRepository from '../IDividendsRepository';

import ICreateManyDTO from '@modules/dividends/dtos/ICreateManyDTO';
import Dividend from '@modules/dividends/infra/typeorm/entities/Dividend';

export default class FakeBondsRepository implements IDividendRepository {
  private dividends: Dividend[] = [];

  public async findAllByActive(active_id: string): Promise<Dividend[]> {
    const activeDividends = this.dividends.filter(
      dividend => dividend.active_id === active_id,
    );

    return activeDividends;
  }

  public async createMany(dividends: ICreateManyDTO[]): Promise<Dividend[]> {
    const dividendsCreated = dividends.map(dividend => {
      const dividendBase = new Dividend();

      Object.assign(dividendBase, {
        id: uuid(),
        active_id: dividend.active_id,
        type: dividend.type,
        EX_date: dividend.EX_date,
        pay_date: dividend.pay_date,
        value: dividend.value,
      });

      this.dividends.push(dividendBase);

      return dividendBase;
    });

    return dividendsCreated;
  }

  public async getDividendsReceivable(
    date: Date,
    active_id: string,
  ): Promise<Dividend[]> {
    const dividendsReceivable = this.dividends.filter(
      dividend =>
        dividend.active_id === active_id &&
        dividend.EX_date >= date &&
        dividend.pay_date > new Date(Date.now()),
    );

    return dividendsReceivable;
  }

  public async getDividends(
    date: Date,
    active_id: string,
  ): Promise<Dividend[]> {
    const dividends = this.dividends.filter(
      dividend =>
        dividend.active_id === active_id &&
        dividend.EX_date >= date &&
        dividend.pay_date <= new Date(Date.now()),
    );

    return dividends;
  }
}
