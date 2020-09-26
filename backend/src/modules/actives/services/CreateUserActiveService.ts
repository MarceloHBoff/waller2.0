import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUserActiveRepository from '../repositories/IUserActivesRepository';

interface IRequest {
  user_id: string;
  code: string;
  type?: string;
  buy_price: number;
  quantity: number;
  buy_date?: Date;
}

@injectable()
export default class CreateUserActiveService {
  constructor(
    @inject('UserActivesRepository')
    private userActiveRepository: IUserActiveRepository,
  ) {}

  public async execute({
    user_id,
    type,
    code,
    buy_price,
    quantity,
    buy_date,
  }: IRequest): Promise<UserActive> {
    const userActive = await this.userActiveRepository.create({
      user_id,
      type: type || '',
      quantity,
      code,
      buy_price,
      buy_date: buy_date || new Date(),
    });

    return userActive;
  }
}
