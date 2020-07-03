import yahoo from 'yahoo-finance';

import IRefreshProviderDTO from '../dtos/IRefreshProviderDTO';
import IRefreshProvider from '../models/IRefreshProvider';

interface IYahooPriceDTO {
  price: {
    shortName: string;
    longName: string;
    regularMarketPrice: number;
    regularMarketPreviousClose: number;
  };
}

export default class YahooRefreshProvider implements IRefreshProvider {
  public async refreshByCode(code: string): Promise<IRefreshProviderDTO> {
    const acaoRegex = /\w{4}\d{1,2}/;

    let symbol = code;

    if (code.match(acaoRegex)) {
      symbol = `${code}.SA`;
    }

    const { price }: IYahooPriceDTO = await yahoo.quote({
      symbol,
      modules: ['price'],
    });

    return {
      price: price.regularMarketPrice,
      lastPrice: price.regularMarketPreviousClose,
    };
  }
}
