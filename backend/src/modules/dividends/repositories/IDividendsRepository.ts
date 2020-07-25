import ICreateManyDTO from '../dtos/ICreateManyDTO';
import Dividend from '../infra/typeorm/entities/Dividend';

export default interface IDividendRepository {
  createMany(dividends: ICreateManyDTO[]): Promise<Dividend[]>;
  findAllByActive(active_id: string): Promise<Dividend[]>;
  getDividendsReceivable(date: Date, active_id: string): Promise<Dividend[]>;
}
