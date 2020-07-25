import IGetDividendsProvider from '../models/IGetDividendsProvider';

import ICreateManyDTO from '@modules/dividends/dtos/ICreateManyDTO';

export default class FakeGetDividendsProvider implements IGetDividendsProvider {
  public async createPage(): Promise<void> {}

  public async getActiveDividends(code: string): Promise<ICreateManyDTO[]> {
    return [
      {
        type: 'dividends',
        EX_date: new Date(),
        pay_date: new Date(),
        value: 0.01,
      },
      {
        type: 'dividends',
        EX_date: new Date(),
        pay_date: new Date(),
        value: 0.02,
      },
    ];
  }

  public async destroyPage(): Promise<void> {}
}
