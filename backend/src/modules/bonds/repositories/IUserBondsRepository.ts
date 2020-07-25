import ICreateUserBondDTO from '../dtos/ICreateUserBondDTO';
import UserBond from '../infra/typeorm/entities/UserBond';

export default interface IUserBondsRepository {
  find(user_id: string, name: string): Promise<UserBond | undefined>;
  findActivesByUserId(user_id: string): Promise<UserBond[]>;
  create(data: ICreateUserBondDTO): Promise<UserBond>;
  removeAutomaticByUserId(user_id: string): Promise<void>;
}
