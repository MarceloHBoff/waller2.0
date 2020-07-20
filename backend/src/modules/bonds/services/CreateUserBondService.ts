import { injectable, inject } from 'tsyringe';

import UserBond from '../infra/typeorm/entities/UserBond';
import IUserBondsRepository from '../repositories/IUserBondsRepository';

interface IRequest {
  user_id: string;
  name: string;
  buy_price: number;
  now_price: number;
  due_date: Date;
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
    due_date,
    buy_price,
    now_price,
  }: IRequest): Promise<UserBond> {
    const active = await this.userBondsRepository.create({
      user_id,
      name,
      due_date,
      buy_price,
      now_price,
    });

    return active;
  }
}
