import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindActivesByCEIService from '@modules/users/services/FindActivesByCEIService';

export default class CEIController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const findActivesByCEI = container.resolve(FindActivesByCEIService);

    findActivesByCEI.execute(request.user.id, cpf, password);

    return response.status(204).send();
  }
}
