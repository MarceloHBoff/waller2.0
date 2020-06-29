import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUserActiveRepository from '../repositories/IUserActivesRepository';

@injectable()
export default class CreateUserActiveService {
  constructor(
    @inject('UserActivesRepository')
    private userActiveRepository: IUserActiveRepository,
  ) {}

  public async execute(user_id: string): Promise<UserActive[]> {
    const userActives = this.userActiveRepository.findAllByUserId(user_id);

    return userActives;
  }
}
