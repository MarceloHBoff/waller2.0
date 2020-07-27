import ICEIActiveDTO from '../dtos/ICEIActiveDTO';
import ICreateUserActiveDTO from '../dtos/ICreateUserActiveDTO';
import IDataDividendsDTO from '../dtos/IDataDividendsDTO';
import UserActive from '../infra/typeorm/entities/UserActive';

export default interface IUserActivesRepository {
  find(user_id: string, code: string): Promise<UserActive | undefined>;
  findActivesByUserId(user_id: string): Promise<UserActive[]>;
  findDataByDividendsList(user_id: string): Promise<IDataDividendsDTO[]>;
  create(data: ICreateUserActiveDTO): Promise<UserActive>;
  updateUserActives(userActives: UserActive[]): Promise<UserActive[]>;
  removeAutomaticByUserId(user_id: string): Promise<void>;
  createOrUpdateByCEI(user_id: string, data: ICEIActiveDTO): Promise<void>;
}
