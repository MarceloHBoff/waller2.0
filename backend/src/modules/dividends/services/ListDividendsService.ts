import { injectable, inject } from 'tsyringe';

import Dividend from '../infra/typeorm/entities/Dividend';
import IDividendRepository from '../repositories/IDividendsRepository';

@injectable()
export default class ListDividendsService {
  constructor(
    @inject('DividendsRepository')
    private dividendsRepository: IDividendRepository,
  ) {}

  public async execute(active_id: string): Promise<Dividend[]> {
    const userBonds = this.dividendsRepository.findAllByActive(active_id);

    return userBonds;
  }
}
