import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUserActiveRepository from '../repositories/IUserActivesRepository';

@injectable()
export default class UpdateUserActivesService {
  constructor(
    @inject('UserActivesRepository')
    private userActiveRepository: IUserActiveRepository,
  ) {}

  public async execute(user_id: string): Promise<UserActive[]> {
    const userActives = await this.userActiveRepository.findAllByUserId(
      user_id,
    );

    const updatedUserActives = await this.userActiveRepository.updateUserActives(
      userActives,
    );

    return updatedUserActives;
  }
}
