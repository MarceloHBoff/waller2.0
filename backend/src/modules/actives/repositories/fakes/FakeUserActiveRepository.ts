import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';

import UserActive from '../../infra/typeorm/entities/UserActive';
import IActivesRepository from '../IActivesRepository';
import IUserActiveRepository from '../IUserActivesRepository';

import ICreateUserActiveDTO from '@modules/actives/dtos/ICreateUserActiveDTO';
import IRefreshProvider from '@modules/actives/providers/RefreshProvider/models/IRefreshProvider';

@injectable()
export default class FakeUserActiveRepository implements IUserActiveRepository {
  private userActives: UserActive[] = [];

  constructor(
    @inject('ActivesRepository')
    private activesRepository: IActivesRepository,

    @inject('RefreshProvider')
    private refreshProvider: IRefreshProvider,
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
    buy_price,
    quantity,
    user_id,
  }: ICreateUserActiveDTO): Promise<UserActive> {
    const findActive = await this.activesRepository.findByCode(code);

    const userActive = new UserActive();

    Object.assign(userActive, {
      id: uuid(),
      active_id: findActive?.id,
      active: findActive,
      user_id,
      buy_price,
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

  public async updateUserActives(data: UserActive[]): Promise<UserActive[]> {
    const userActives = data;

    for (let i = 0; i < userActives.length; i++) {
      const { price, last_price } = await this.refreshProvider.refreshByCode(
        userActives[i].active.code,
      );

      userActives[i].active.price = price;
      userActives[i].active.last_price = last_price;

      await this.activesRepository.updatePrice({
        id: userActives[i].active.id,
        price,
        last_price,
      });
    }

    return userActives;
  }

  public async createOrUpdateByCEI(
    user_id: string,
    data: object,
  ): Promise<void> {}

  public async removeAutomaticByUserId(user_id: string): Promise<void> {
    this.userActives.filter(
      userActive =>
        userActive.user_id !== user_id && userActive.automatic === false,
    );
  }
}
