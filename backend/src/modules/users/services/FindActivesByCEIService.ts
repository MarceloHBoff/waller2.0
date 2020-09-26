import { injectable, inject } from 'tsyringe';

import ICEICrawlerProvider from '../providers/CEICrawlerProvider/models/ICEICrawlerProvider';

@injectable()
export default class FindActivesByCEIService {
  constructor(
    @inject('CEICrawlerProvider')
    private CEICrawlerProvider: ICEICrawlerProvider,
  ) {}

  public async execute(
    user_id: string,
    cpf: string,
    password: string,
  ): Promise<void> {
    try {
      await this.CEICrawlerProvider.findUserActivesByCEI(
        user_id,
        cpf,
        password,
      );
      console.log('Ok');
    } catch (err) {
      console.log('Catch', err);
    }

    await this.CEICrawlerProvider.closeCrawler();
  }
}
