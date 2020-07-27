import { classToClass } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import Dividend from '../infra/typeorm/entities/Dividend';
import IDividendRepository from '../repositories/IDividendsRepository';

import IUserActivesRepository from '@modules/actives/repositories/IUserActivesRepository';

interface IDividendResponse extends Dividend {
  active_id: string;
  quantity: number;
}

interface IMonthlyDividends {
  month: number;
  year: number;
  total: number;
  dividends: Omit<IDividendResponse[], 'active_id'>;
}

@injectable()
export default class ListUserDividendsMonthlyService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendRepository,

    @inject('UserActivesRepository')
    private userActivesRepository: IUserActivesRepository,
  ) {}

  public async execute(
    user_id: string,
  ): Promise<{ dividends: IMonthlyDividends[]; total: number }> {
    const actives = await this.userActivesRepository.findDataByDividendsList(
      user_id,
    );

    let dividends: IDividendResponse[] = [];
    const dividendsByMonth: IMonthlyDividends[] = [];
    const unifiedDividends: IDividendResponse[] = [];

    for (let i = 0; i < actives.length; i++) {
      const getActiveDividends = await this.dividendsRepository.getDividends(
        actives[i].buy_date,
        actives[i].active_id,
      );

      const editedDividends = classToClass(getActiveDividends).map(
        dividend => ({
          ...dividend,
          active_id: actives[i].active_id,
          quantity: Number(actives[i].quantity),
        }),
      );

      dividends = [...dividends, ...editedDividends];
    }

    dividends.forEach(dividend => {
      const findIndex = unifiedDividends.findIndex(
        unifiedDividend =>
          unifiedDividend.active_id === dividend.active_id &&
          unifiedDividend.type === dividend.type &&
          unifiedDividend.EX_date === dividend.EX_date,
      );

      if (findIndex >= 0) {
        unifiedDividends[findIndex].quantity += dividend.quantity;
      } else {
        unifiedDividends.push(dividend);
      }
    });

    unifiedDividends.forEach(dividend => {
      const month = this.getDate(String(dividend.pay_date)).getMonth() + 1;
      const year = this.getDate(String(dividend.pay_date)).getFullYear();

      const findIndex = dividendsByMonth.findIndex(
        dividendMonth =>
          dividendMonth.month === month && dividendMonth.year === year,
      );

      delete dividend.active_id;

      if (findIndex >= 0) {
        dividendsByMonth[findIndex].dividends.push(dividend);
        dividendsByMonth[findIndex].total += dividend.quantity * dividend.value;
      } else {
        dividendsByMonth.push({
          month,
          year,
          total: dividend.quantity * dividend.value,
          dividends: [dividend],
        });
      }
    });

    dividendsByMonth.sort((a, b) => {
      if (a.year > b.year || (a.year === b.year && a.month > b.month)) return 1;
      return -1;
    });

    const total = dividendsByMonth.reduce(
      (acc, current) => acc + current.total,
      0,
    );

    return { dividends: dividendsByMonth, total };
  }

  private getDate(date: string): Date {
    return new Date(
      Number(date.substr(6, 9)),
      Number(date.substr(3, 2)) - 1,
      Number(date.substr(0, 2)),
    );
  }
}
