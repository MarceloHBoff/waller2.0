import IUSDProvider from '../models/IUSDProvider';

export default class FakeUSDProvider implements IUSDProvider {
  public async getUSD(): Promise<number> {
    return 5.0;
  }
}
