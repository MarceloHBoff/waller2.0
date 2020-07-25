import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ActivesRepository from '@modules/actives/infra/typeorm/repositories/ActivesRepository';
import ListUserDividendsReceivablesService from '@modules/dividends/services/ListUserDividendsReceivablesService';
import SearchDividendsService from '@modules/dividends/services/SearchDividendsService';

export default class DividendsController {
  public async store(request: Request, response: Response): Promise<Response> {
    const searchDividends = container.resolve(SearchDividendsService);
    const activesRepository = container.resolve(ActivesRepository);

    await searchDividends.start();

    const actives = await activesRepository.getAllCodes();

    for (let i = 0; i < actives.length; i++) {
      await searchDividends.execute(actives[i].code, actives[i].id);
    }

    await searchDividends.finish();

    return response.status(201).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listDividends = container.resolve(
      ListUserDividendsReceivablesService,
    );

    const dividends = await listDividends.execute(request.user.id);

    return response.status(201).json(classToClass(dividends));
  }
}
