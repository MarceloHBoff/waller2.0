import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDividendsService from '@modules/dividends/services/ListDividendsService';

export default class DividendsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDividends = container.resolve(ListDividendsService);

    const dividends = await listDividends.execute(request.user.id);

    return response.status(201).json(classToClass(dividends));
  }
}
