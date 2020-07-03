import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUserActiveRepository from '../repositories/IUserActivesRepository';

interface IRequest {
  user_id: string;
  code: string;
  buyPrice: number;
  quantity: number;
}

@injectable()
export default class CreateUserActiveService {
  constructor(
    @inject('UserActivesRepository')
    private userActiveRepository: IUserActiveRepository,
  ) {}

  public async execute({
    user_id,
    code,
    quantity,
    buyPrice,
  }: IRequest): Promise<UserActive> {
    const userActive = await this.userActiveRepository.create({
      user_id,
      buyPrice,
      quantity,
      code,
    });

    return userActive;
  }
}