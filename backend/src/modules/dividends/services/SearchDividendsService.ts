import { injectable, inject } from 'tsyringe';

import IGetDividendsProvider from '../providers/GetDividendsProvider/models/IGetDividendsProvider';
import IDividendRepository from '../repositories/IDividendsRepository';

import IActivesRepository from '@modules/actives/repositories/IActivesRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class ListDividendsService {
  constructor(
    @inject('GetDividendsProvider')
    private getDividendsProvider: IGetDividendsProvider,

    @inject('ActivesRepository')
    private activesRepository: IActivesRepository,

    @inject('DividendsRepository')
    private dividendsRepository: IDividendRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async start(): Promise<void> {
    await this.getDividendsProvider.createPage();

    await this.cacheProvider.invalidatePrefix(`list-dividends`);
    await this.cacheProvider.invalidatePrefix(`list-dividendsReceivable`);
    await this.cacheProvider.invalidatePrefix(`list-dividendsMonthly`);
  }

  public async execute(code: string, id?: string): Promise<void> {
    let active_id = id;

    if (!id) {
      const active = await this.activesRepository.getByCode(code);
      active_id = active.id;
    }

    const dividends = await this.getDividendsProvider.getActiveDividends(code);

    const dividendSerialized = dividends.map(dividend => ({
      ...dividend,
      active_id,
      value: dividend.type === 'jscp' ? dividend.value * 0.85 : dividend.value,
    }));

    await this.dividendsRepository.createMany(dividendSerialized);
  }

  public async finish(): Promise<void> {
    console.log('Finish');
    await this.getDividendsProvider.destroyPage();
  }
}
