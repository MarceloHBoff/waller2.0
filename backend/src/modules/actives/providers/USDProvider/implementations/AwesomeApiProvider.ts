import axios from 'axios';

import IUSDProvider from '../models/IUSDProvider';

interface IAwesomeApiResponse {
  USD: {
    ask: number;
  };
}

export default class AwesomeApiProvider implements IUSDProvider {
  public async getUSD(): Promise<number> {
    try {
      const { data } = await axios.get<IAwesomeApiResponse>(
        'https://economia.awesomeapi.com.br/all/USD-BRL',
      );

      return data.USD.ask;
    } catch {
      console.log('Api FOREX Error');
      return 5;
    }
  }
}
