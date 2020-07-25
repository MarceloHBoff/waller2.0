import ICreateManyDTO from '../../../dtos/ICreateManyDTO';

export default interface IGetDividendsProvider {
  createPage(): Promise<void>;
  getActiveDividends(code: string): Promise<ICreateManyDTO[]>;
  destroyPage(): Promise<void>;
}
