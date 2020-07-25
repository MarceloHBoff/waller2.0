import { injectable, inject } from 'tsyringe';

import Dividend from '../infra/typeorm/entities/Dividend';
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

  public async execute(code: string): Promise<void> {
    const active = await this.activesRepository.getByCode(code);

    const dividends = await this.getDividendsProvider.getActiveDividends(code);

    const dividendSerialized = dividends.map(dividend => ({
      active_id: active?.id,
      ...dividend,
    }));

    const response = await this.dividendsRepository.createMany(
      dividendSerialized,
    );

    console.log(response);
  }

  public async finish(): Promise<void> {
    await this.getDividendsProvider.destroyPage();
  }
}
