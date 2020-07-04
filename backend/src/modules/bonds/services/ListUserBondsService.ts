import { injectable, inject } from 'tsyringe';

import UserBond from '../infra/typeorm/entities/UserBond';
import IUserBondsRepository from '../repositories/IUserBondsRepository';

@injectable()
export default class ListUserBondsService {
  constructor(
    @inject('UserBondsRepository')
    private userBondsRepository: IUserBondsRepository,
  ) {}

  public async execute(user_id: string): Promise<UserBond[]> {
    const userBonds = this.userBondsRepository.findAllByUserId(user_id);

    return userBonds;
  }
}
