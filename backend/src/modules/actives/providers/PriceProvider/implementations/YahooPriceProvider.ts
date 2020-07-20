import yahoo from 'yahoo-finance';

import IPriceProviderDTO from '../dtos/IPriceProviderDTO';
import IPriceProvider from '../models/IPriceProvider';

interface IYahooPriceDTO {
  price: {
    shortName: string;
    longName: string;
    regularMarketPrice: number;
    regularMarketPreviousClose: number;
  };
}

export default class YahooPriceProvider implements IPriceProvider {
  public async getByCode(code: string): Promise<IPriceProviderDTO> {
    const acaoRegex = /\w{4}\d{1,2}/;

    let symbol = code;
    let type = '';

    if (code.match(acaoRegex)) {
      symbol = `${code}.SA`;
      type = 'Acao';
    } else {
      type = 'Stock';
    }

    const { price }: IYahooPriceDTO = await yahoo.quote({
      symbol,
      modules: ['price'],
    });

    if (price.shortName.substr(0, 3) === 'FII') type = 'FII';
    if (price.longName && price.longName.search('ETF') !== -1) type = 'ETF';

    return {
      code,
      name: price.longName || price.shortName,
      type,
      price: price.regularMarketPrice,
      last_price: price.regularMarketPreviousClose,
    };
  }
}
