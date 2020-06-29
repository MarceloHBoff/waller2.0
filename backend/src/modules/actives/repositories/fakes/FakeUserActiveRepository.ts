import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';

import UserActive from '../../infra/typeorm/entities/UserActive';
import IActivesRepository from '../IActivesRepository';
import IUserActiveRepository from '../IUserActivesRepository';

import ICreateUserActiveDTO from '@modules/actives/dtos/ICreateUserActiveDTO';

@injectable()
export default class FakeUserActiveRepository implements IUserActiveRepository {
  private userActives: UserActive[] = [];

  constructor(
    @inject('ActivesRepository')
    private activesRepository: IActivesRepository,
  ) {}

  public async find(
    user_id: string,
    code: string,
  ): Promise<UserActive | undefined> {
    const findActive = await this.activesRepository.findByCode(code);

    const findUserActive = this.userActives.find(
      userActive =>
        userActive.user_id === user_id &&
        userActive.active_id === findActive?.id,
    );

    return findUserActive;
  }

  public async create({
    code,
    buyPrice,
    quantity,
    user_id,
  }: ICreateUserActiveDTO): Promise<UserActive> {
    const findActive = await this.activesRepository.findByCode(code);

    const userActive = new UserActive();

    Object.assign(userActive, {
      id: uuid(),
      active_id: findActive?.id,
      user_id,
      buyPrice,
      quantity,
    });

    this.userActives.push(userActive);

    return userActive;
  }

  public async findAllByUserId(user_id: string): Promise<UserActive[]> {
    const userActives = this.userActives.filter(
      userActive => userActive.user_id === user_id,
    );

    return userActives;
  }
}
