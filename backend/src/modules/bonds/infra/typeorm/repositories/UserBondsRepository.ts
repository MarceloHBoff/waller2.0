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
    due_date,
    buy_price,
    now_price,
    automatic = false,
  }: ICreateUserBondDTO): Promise<UserBond> {
    const userBond = this.ormRepository.create({
      user_id,
      name,
      buy_price,
      due_date,
      now_price,
      automatic,
    });

    await this.ormRepository.save(userBond);

    return userBond;
  }

  public async findActivesByUserId(user_id: string): Promise<UserBond[]> {
    const userBonds = await this.ormRepository.find({
      where: { user_id },
    });

    return userBonds;
  }

  public async removeAutomaticByUserId(user_id: string): Promise<void> {
    this.ormRepository.delete({ user_id, automatic: true });
  }
}
