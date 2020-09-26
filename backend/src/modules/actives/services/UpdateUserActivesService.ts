import { injectable, inject } from 'tsyringe';

import UserActive from '../infra/typeorm/entities/UserActive';
import IUserActivesRepository from '../repositories/IUserActivesRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class UpdateUserActivesService {
  constructor(
    @inject('UserActivesRepository')
    private userActivesRepository: IUserActivesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<UserActive[]> {
    const userActives = await this.userActivesRepository.findActivesByUserId(
      user_id,
    );

    const updatedUserActives = await this.userActivesRepository.updateUserActives(
      userActives,
    );

    await this.cacheProvider.invalidate(`list-userActives:${user_id}`);

    return updatedUserActives;
  }
}
