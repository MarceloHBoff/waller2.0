import { uuid } from 'uuidv4';

import ICreateUserBondDTO from '@modules/bonds/dtos/ICreateUserBondDTO';
import UserBond from '@modules/bonds/infra/typeorm/entities/UserBond';
import IUserBondsRepository from '@modules/bonds/repositories/IUserBondsRepository';

export default class FakeBondsRepository implements IUserBondsRepository {
  private userBonds: UserBond[] = [];

  public async find(
    user_id: string,
    name: string,
  ): Promise<UserBond | undefined> {
    const findUserBonds = await this.userBonds.find(
      userBond => userBond.user_id === user_id && userBond.name === name,
    );

    return findUserBonds;
  }

  public async create({
    user_id,
    name,
    due_date,
    buy_price,
    now_price,
  }: ICreateUserBondDTO): Promise<UserBond> {
    const userBond = new UserBond();

    Object.assign(userBond, {
      id: uuid(),
      user_id,
      name,
      buy_price,
      due_date,
      now_price,
    });

    this.userBonds.push(userBond);

    return userBond;
  }

  public async findAllByUserId(user_id: string): Promise<UserBond[]> {
    const userBonds = this.userBonds.filter(
      userBond => userBond.user_id === user_id,
    );

    return userBonds;
  }

  public async removeAutomaticByUserId(user_id: string): Promise<void> {
    this.userBonds.filter(
      userBond => userBond.user_id !== user_id && userBond.automatic === false,
    );
  }
}
