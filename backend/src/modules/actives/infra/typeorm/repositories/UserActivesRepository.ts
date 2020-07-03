import { injectable, inject } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';

import IUserActiveRepository from '../../../repositories/IUserActivesRepository';
import UserActive from '../entities/UserActive';

import ActivesRepository from './ActivesRepository';

import ICreateUserActiveDTO from '@modules/actives/dtos/ICreateUserActiveDTO';
import IRefreshProvider from '@modules/actives/providers/RefreshProvider/models/IRefreshProvider';

@injectable()
export default class UserActivesRepository implements IUserActiveRepository {
  private ormRepository: Repository<UserActive>;

  constructor(
    @inject('ActivesRepository')
    private activesRepository: ActivesRepository,

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
  }: ICreateUserActiveDTO): Promise<UserActive> {
    const active = await this.activesRepository.findByCode(code);

    const userActive = this.ormRepository.create({
      user_id,
      active_id: active?.id,
      buyPrice,
      quantity,
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

    return userActives;
  }
}
