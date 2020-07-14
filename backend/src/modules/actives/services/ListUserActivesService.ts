import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUserActiveRepository from '../repositories/IUserActivesRepository';

import IUserBondsRepository from '@modules/bonds/repositories/IUserBondsRepository';

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
  ) {}

  public async execute(user_id: string): Promise<IResponse> {
    const userActives = await this.userActiveRepository.findAllByUserId(
      user_id,
    );

    const userBonds = await this.userBondsRepository.findAllByUserId(user_id);

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
          break;
        case 'Stock':
          Stock += userActive.quantity * userActive.active.price;
          break;
        case 'ETF':
          ETF += userActive.quantity * userActive.active.price;
          break;
        case 'FII':
          FII += userActive.quantity * userActive.active.price;
          break;
        case 'Reit':
          Reit += userActive.quantity * userActive.active.price;
          break;
        default:
          return;
      }

      investment += userActive.quantity * userActive.buyPrice;
      currentValue += userActive.quantity * userActive.active.price;
    });

    userBonds.forEach(userBond => {
      Bond += Number(userBond.nowPrice);

      investment += Number(userBond.buyPrice);
      currentValue += Number(userBond.nowPrice);
    });

    return {
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
  }
}
