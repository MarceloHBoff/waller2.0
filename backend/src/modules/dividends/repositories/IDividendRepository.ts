import Dividend from '../infra/typeorm/entities/Dividend';

export default interface IDividendRepository {
  findAllByActive(active_id: string): Promise<Dividend[]>;
  create(active_id: string): Promise<Dividend>;
}
