import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDividendsService from '@modules/dividends/services/ListDividendsService';
import SearchDividendsService from '@modules/dividends/services/SearchDividendsService';

export default class DividendsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const searchDividends = container.resolve(SearchDividendsService);

    await searchDividends.start();
    await searchDividends.execute('WEGE3');
    await searchDividends.finish();

    return response.status(201).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listDividends = container.resolve(ListDividendsService);

    const dividends = await listDividends.execute(
      '3cefd65d-713f-4dbb-887a-f919f6fa157d',
    );

    return response.status(201).json(classToClass(dividends));
  }
}
