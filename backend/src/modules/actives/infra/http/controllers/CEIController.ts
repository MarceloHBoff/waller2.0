import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindActivesByCEIService from '@modules/actives/services/FindActivesByCEIService';

export default class CEIController {
  public async create(request: Request, response: Response): Promise<Response> {
    const findActivesByCEI = container.resolve(FindActivesByCEIService);

    findActivesByCEI.execute(request.user.id);

    return response.status(204).send();
  }
}
