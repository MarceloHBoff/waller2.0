import { injectable, inject } from 'tsyringe';

import UserBond from '../infra/typeorm/entities/UserBond';
import IUserBondsRepository from '../repositories/IUserBondsRepository';

interface IRequest {
  user_id: string;
  name: string;
  buyPrice: number;
  nowPrice: number;
  dueDate: Date;
}

@injectable()
export default class CreateUserBondService {
  constructor(
    @inject('UserBondsRepository')
    private userBondsRepository: IUserBondsRepository,
  ) {}

  public async execute({
    user_id,
    name,
    dueDate,
    buyPrice,
    nowPrice,
  }: IRequest): Promise<UserBond> {
    const active = await this.userBondsRepository.create({
      user_id,
      name,
      dueDate,
      buyPrice,
      nowPrice,
    });

    return active;
  }
}
