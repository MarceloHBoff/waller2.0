import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUSDProvider from '../providers/USDProvider/models/IUSDProvider';
import IUserActiveRepository from '../repositories/IUserActivesRepository';

import IUserBondsRepository from '@modules/bonds/repositories/IUserBondsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IResponse {
  actives: UserActive[];
  types: {
    Acao: number;
    Stock: number;
    ETF: number;
    FII: number;
    Reit: number;
    Bond: number;
  };
  totals: {
    investment: number;
    currentValue: number;
    profit: number;
    percent: number;
  };
}

@injectable()
export default class CreateUserActiveService {
  constructor(
    @inject('UserActivesRepository')
    private userActiveRepository: IUserActiveRepository,

    @inject('UserBondsRepository')
    private userBondsRepository: IUserBondsRepository,

    @inject('USDProvider')
    private USDProvider: IUSDProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<IResponse> {
    const cacheKey = `list-userActives:${user_id}`;

    const userActivesCached = await this.cacheProvider.recover<IResponse>(
      cacheKey,
    );

    if (userActivesCached) return userActivesCached;

    const userActives = await this.userActiveRepository.findActivesByUserId(
      user_id,
    );

    const userBonds = await this.userBondsRepository.findActivesByUserId(
      user_id,
    );

    const USD = await this.USDProvider.getUSD();

    let investment = 0;
    let currentValue = 0;

    let Acao = 0;
    let Stock = 0;
    let ETF = 0;
    let FII = 0;
    let Reit = 0;
    let Bond = 0;

    userActives.forEach(userActive => {
      switch (userActive.active.type) {
        case 'Acao':
          Acao += userActive.quantity * userActive.active.price;
          investment += userActive.quantity * userActive.buy_price;
          currentValue += userActive.quantity * userActive.active.price;
          break;
        case 'Stock':
          Stock += userActive.quantity * userActive.active.price * USD;
          investment += userActive.quantity * userActive.buy_price * USD;
          currentValue += userActive.quantity * userActive.active.price * USD;
          break;
        case 'ETF':
          ETF += userActive.quantity * userActive.active.price;
          investment += userActive.quantity * userActive.buy_price;
          currentValue += userActive.quantity * userActive.active.price;
          break;
        case 'FII':
          FII += userActive.quantity * userActive.active.price;
          investment += userActive.quantity * userActive.buy_price;
          currentValue += userActive.quantity * userActive.active.price;
          break;
        case 'Reit':
          Reit += userActive.quantity * userActive.active.price * USD;
          investment += userActive.quantity * userActive.buy_price * USD;
          currentValue += userActive.quantity * userActive.active.price * USD;
          break;
        default:
      }
    });

    userBonds.forEach(userBond => {
      Bond += Number(userBond.now_price);

      investment += Number(userBond.buy_price);
      currentValue += Number(userBond.now_price);
    });

    const response = {
      actives: userActives,
      types: {
        Acao,
        Stock,
        ETF,
        FII,
        Reit,
        Bond,
      },
      totals: {
        investment,
        currentValue,
        profit: currentValue - investment,
        percent: (currentValue / investment - 1) * 100,
      },
    };

    await this.cacheProvider.save(cacheKey, response);

    return response;
  }
}
