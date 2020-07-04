import ICEICrawlerProvider from '../models/ICEICrawlerProvider';

export default class FakeCEICrawlerProvider implements ICEICrawlerProvider {
  public async findUserActivesByCEI(user_id: string): Promise<void> {
    if (user_id === '1') throw new Error('');
  }
}
