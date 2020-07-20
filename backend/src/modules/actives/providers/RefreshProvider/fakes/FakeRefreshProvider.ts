import IRefreshProviderDTO from '../dtos/IRefreshProviderDTO';
import IRefreshProvider from '../models/IRefreshProvider';

export default class FakeRefreshProvider implements IRefreshProvider {
  public async refreshByCode(code: string): Promise<IRefreshProviderDTO> {
    return {
      price: 10,
      last_price: 11,
    };
  }
}
