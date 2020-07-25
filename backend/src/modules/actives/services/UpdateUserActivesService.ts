import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUserActivesRepository from '../repositories/IUserActivesRepository';

@injectable()
export default class UpdateUserActivesService {
  constructor(
    @inject('UserActivesRepository')
    private userActivesRepository: IUserActivesRepository,
  ) {}

  public async execute(user_id: string): Promise<UserActive[]> {
    const userActives = await this.userActivesRepository.findActivesByUserId(
      user_id,
    );

    const updatedUserActives = await this.userActivesRepository.updateUserActives(
      userActives,
    );

    return updatedUserActives;
  }
}
