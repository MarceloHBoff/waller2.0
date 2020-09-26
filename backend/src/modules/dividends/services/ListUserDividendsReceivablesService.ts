import { classToClass } from 'class-transformer';
import { injectable, inject } from 'tsyringe';

import Dividend from '../infra/typeorm/entities/Dividend';
import IDividendRepository from '../repositories/IDividendsRepository';

import IUserActivesRepository from '@modules/actives/repositories/IUserActivesRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IDividendResponse extends Dividend {
  active_id: string;
  quantity: number;
}

interface IResponse {
  dividends: IDividendResponse[];
  total: number;
}

@injectable()
export default class ListUserDividendsReceivablesService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendRepository,

    @inject('UserActivesRepository')
    private userActivesRepository: IUserActivesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<IResponse> {
    const cacheKey = `list-dividendsReceivable:${user_id}`;

    const userDividendsCached = await this.cacheProvider.recover<IResponse>(
      cacheKey,
    );

    if (userDividendsCached) return userDividendsCached;

    const actives = await this.userActivesRepository.findDataByDividendsList(
      user_id,
    );

    let dividends: IDividendResponse[] = [];

    for (let i = 0; i < actives.length; i++) {
      const getActiveDividends = await this.dividendsRepository.getDividendsReceivable(
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

    const total = dividends.reduce(
      (acc, current) => acc + current.quantity * current.value,
      0,
    );

    const response = { dividends, total };

    await this.cacheProvider.save(cacheKey, response);

    return response;
  }
}
