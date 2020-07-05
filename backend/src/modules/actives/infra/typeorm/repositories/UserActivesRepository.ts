import { injectable, inject } from 'tsyringe';
import { Repository, getRepository, getConnection } from 'typeorm';

import IUserActiveRepository from '../../../repositories/IUserActivesRepository';
import UserActive from '../entities/UserActive';

import ICEIActiveDTO from '@modules/actives/dtos/ICEIActiveDTO';
import ICreateUserActiveDTO from '@modules/actives/dtos/ICreateUserActiveDTO';
import IRefreshProvider from '@modules/actives/providers/RefreshProvider/models/IRefreshProvider';
import IActivesRepository from '@modules/actives/repositories/IActivesRepository';

@injectable()
export default class UserActivesRepository implements IUserActiveRepository {
  private ormRepository: Repository<UserActive>;

  private connection = getConnection().createQueryRunner();

  constructor(
    @inject('ActivesRepository')
    private activesRepository: IActivesRepository,

    @inject('RefreshProvider')
    private refreshProvider: IRefreshProvider,
  ) {
    this.ormRepository = getRepository(UserActive);
  }

  public async find(
    user_id: string,
    code: string,
  ): Promise<UserActive | undefined> {
    const active = await this.activesRepository.findByCode(code);

    const findUserActive = await this.ormRepository.findOne({
      where: { user_id, active },
    });

    return findUserActive;
  }

  public async create({
    user_id,
    code,
    quantity,
    buyPrice,
    buyDate,
    automatic = false,
  }: ICreateUserActiveDTO): Promise<UserActive> {
    const active = await this.activesRepository.findByCode(code);

    const userActive = this.ormRepository.create({
      user_id,
      active_id: active?.id,
      quantity,
      buyPrice,
      buyDate,
      automatic,
    });

    await this.ormRepository.save(userActive);

    return userActive;
  }

  public async findAllByUserId(user_id: string): Promise<UserActive[]> {
    const userActives = await this.ormRepository.find({
      where: { user_id },
      relations: ['active'],
    });

    return userActives;
  }

  public async updateUserActives(data: UserActive[]): Promise<UserActive[]> {
    const userActives = data;

    this.connection.startTransaction();

    for (let i = 0; i < userActives.length; i++) {
      const { price, lastPrice } = await this.refreshProvider.refreshByCode(
        userActives[i].active.code,
      );

      userActives[i].active.price = price;
      userActives[i].active.lastPrice = lastPrice;

      await this.activesRepository.updatePrice({
        id: userActives[i].active.id,
        price,
        lastPrice,
      });
    }

    this.connection.commitTransaction();

    return userActives;
  }

  public async removeAutomaticByUserId(user_id: string): Promise<void> {
    this.connection.startTransaction();

    const deleteUserActive = await this.ormRepository.find({
      where: { user_id, automatic: true },
    });

    this.ormRepository.remove(deleteUserActive);

    this.connection.commitTransaction();
  }

  public async createOrUpdateByCEI(
    user_id: string,
    data: ICEIActiveDTO,
  ): Promise<void> {
    const { code, buyDate, type } = data;

    let { price, quantity } = data;

    if (code === 'SQIA3') {
      quantity *= 4;
      price /= 4;
    }

    if (code.substr(0, 4) === 'SAPR') {
      quantity *= 3;
      price /= 3;
    }

    const userActive = await this.findByBuyDate(user_id, code, buyDate);

    if (userActive) {
      if (type === 'C') {
        userActive.quantity += quantity;

        const totalValue = userActive.buyPrice * userActive.quantity;
        const newTotalValue = price * userActive.quantity;

        userActive.buyPrice =
          (totalValue + newTotalValue) / userActive.quantity;
      } else {
        userActive.quantity -= quantity;
        userActive.buyPrice = (userActive.buyPrice + price) / 2;
      }

      userActive.automatic = true;

      await this.ormRepository.save(userActive);
    } else {
      await this.create({
        user_id,
        code,
        quantity,
        buyDate,
        buyPrice: price,
        automatic: true,
      });
    }
  }

  private async findByBuyDate(
    user_id: string,
    code: string,
    buyDate: Date,
  ): Promise<UserActive | undefined> {
    const active = await this.activesRepository.findByCode(code);

    const findUserActive = await this.ormRepository.findOne({
      where: { user_id, active, buyDate },
    });

    return findUserActive;
  }
}
