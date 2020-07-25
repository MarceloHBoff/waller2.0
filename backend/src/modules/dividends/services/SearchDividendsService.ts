import { injectable, inject } from 'tsyringe';

import IGetDividendsProvider from '../providers/GetDividendsProvider/models/IGetDividendsProvider';
import IDividendRepository from '../repositories/IDividendsRepository';

import IActivesRepository from '@modules/actives/repositories/IActivesRepository';

@injectable()
export default class ListDividendsService {
  constructor(
    @inject('GetDividendsProvider')
    private getDividendsProvider: IGetDividendsProvider,

    @inject('ActivesRepository')
    private activesRepository: IActivesRepository,

    @inject('DividendsRepository')
    private dividendsRepository: IDividendRepository,
  ) {}

  public async start(): Promise<void> {
    await this.getDividendsProvider.createPage();
  }

  public async execute(code: string, id?: string): Promise<void> {
    let active_id = id;

    if (!id) {
      const active = await this.activesRepository.getByCode(code);
      active_id = active.id;
    }

    const dividends = await this.getDividendsProvider.getActiveDividends(code);

    const dividendSerialized = dividends.map(dividend => ({
      active_id,
      ...dividend,
    }));

    await this.dividendsRepository.createMany(dividendSerialized);
  }

  public async finish(): Promise<void> {
    await this.getDividendsProvider.destroyPage();
  }
}
