import ICreateUserActiveDTO from '../dtos/ICreateUserActiveDTO';
import UserActive from '../infra/typeorm/entities/UserActive';

export default interface IUserActivesRepository {
  find(user_id: string, code: string): Promise<UserActive | undefined>;
  findAllByUserId(user_id: string): Promise<UserActive[]>;
  create(data: ICreateUserActiveDTO): Promise<UserActive>;
  updateUserActives(userActives: UserActive[]): Promise<UserActive[]>;
}
