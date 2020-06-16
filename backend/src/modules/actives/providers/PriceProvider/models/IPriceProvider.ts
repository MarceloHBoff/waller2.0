import IPriceProviderDTO from '../dtos/IPriceProviderDTO';

export default interface IPriceProvider {
  getByCode(code: string): Promise<IPriceProviderDTO>;
}
