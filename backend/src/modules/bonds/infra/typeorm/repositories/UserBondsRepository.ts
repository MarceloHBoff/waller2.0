import { Repository, getRepository, getConnection } from 'typeorm';

import UserBond from '../entities/UserBond';

import ICreateUserBondDTO from '@modules/bonds/dtos/ICreateUserBondDTO';
import IUserBondsRepository from '@modules/bonds/repositories/IUserBondsRepository';

export default class UserBondsRepository implements IUserBondsRepository {
  private ormRepository: Repository<UserBond>;

  private connection = getConnection().createQueryRunner();

  constructor() {
    this.ormRepository = getRepository(UserBond);
  }

  public async find(
    user_id: string,
    name: string,
  ): Promise<UserBond | undefined> {
    const findUserBonds = await this.ormRepository.findOne({
      where: { user_id, name },
    });

    return findUserBonds;
  }

  public async create({
    user_id,
    name,
    dueDate,
    buyPrice,
    nowPrice,
    automatic = false,
  }: ICreateUserBondDTO): Promise<UserBond> {
    const userBond = this.ormRepository.create({
      user_id,
      name,
      buyPrice,
      dueDate,
      nowPrice,
      automatic,
    });

    await this.ormRepository.save(userBond);

    return userBond;
  }

  public async findAllByUserId(user_id: string): Promise<UserBond[]> {
    const userBonds = await this.ormRepository.find({
      where: { user_id },
    });

    return userBonds;
  }

  public async removeAutomaticByUserId(user_id: string): Promise<void> {
    this.ormRepository.delete({ user_id, automatic: true });
  }
}
