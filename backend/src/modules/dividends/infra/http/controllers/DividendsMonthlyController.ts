import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserDividendsMonthlyService from '@modules/dividends/services/ListUserDividendsMonthlyService';

export default class DividendsMonthlyController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDividends = container.resolve(ListUserDividendsMonthlyService);

    const dividends = await listDividends.execute(request.user.id);

    return response.status(201).json(classToClass(dividends));
  }
}
