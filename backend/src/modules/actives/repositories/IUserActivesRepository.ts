import ICEIActiveDTO from '../dtos/ICEIActiveDTO';
import ICreateUserActiveDTO from '../dtos/ICreateUserActiveDTO';
import UserActive from '../infra/typeorm/entities/UserActive';

export default interface IUserActivesRepository {
  find(user_id: string, code: string): Promise<UserActive | undefined>;
  findAllByUserId(user_id: string): Promise<UserActive[]>;
  create(data: ICreateUserActiveDTO): Promise<UserActive>;
  updateUserActives(userActives: UserActive[]): Promise<UserActive[]>;
  removeAutomaticByUserId(user_id: string): Promise<void>;
  createOrUpdateByCEI(user_id: string, data: ICEIActiveDTO): Promise<void>;
}
