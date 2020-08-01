import { classToClass } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import Dividend from '../infra/typeorm/entities/Dividend';
import IDividendRepository from '../repositories/IDividendsRepository';

import IUserActivesRepository from '@modules/actives/repositories/IUserActivesRepository';

interface IDividendResponse extends Dividend {
  active_id: string;
  quantity: number;
}

@injectable()
export default class ListUserDividendsService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendRepository,

    @inject('UserActivesRepository')
    private userActivesRepository: IUserActivesRepository,
  ) {}

  public async execute(
    user_id: string,
  ): Promise<{ dividends: IDividendResponse[]; total: number }> {
    const actives = await this.userActivesRepository.findDataByDividendsList(
      user_id,
    );

    let dividends: IDividendResponse[] = [];
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

    const total = unifiedDividends.reduce(
      (acc, current) => acc + current.quantity * current.value,
      0,
    );

    return { dividends: unifiedDividends, total };
  }
}