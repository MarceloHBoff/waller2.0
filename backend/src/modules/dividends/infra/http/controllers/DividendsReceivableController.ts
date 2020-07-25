import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUserDividendsReceivablesService from '@modules/dividends/services/ListUserDividendsReceivablesService';

export default class DividendsReceivableController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDividends = container.resolve(
      ListUserDividendsReceivablesService,
    );

    const dividends = await listDividends.execute(request.user.id);

    return response.status(201).json(classToClass(dividends));
  }
}
