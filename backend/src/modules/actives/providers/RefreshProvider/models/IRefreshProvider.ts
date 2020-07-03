import IRefreshProviderDTO from '../dtos/IRefreshProviderDTO';

export default interface IRefreshProvider {
  refreshByCode(code: string): Promise<IRefreshProviderDTO>;
}
