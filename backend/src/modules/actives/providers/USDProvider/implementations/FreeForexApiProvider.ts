import axios from 'axios';

import IUSDProvider from '../models/IUSDProvider';

interface IFreeForexApiResponse {
  rates: {
    USDBRL: {
      rate: number;
    };
  };
}

export default class FreeForexApiProvider implements IUSDProvider {
  public async getUSD(): Promise<number> {
    const { data } = await axios.get<IFreeForexApiResponse>(
      'https://www.freeforexapi.com/api/live?pairs=USDBRL',
    );

    return data.rates.USDBRL.rate;
  }
}
