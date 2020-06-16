import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateActiveService from '@modules/actives/services/CreateActiveService';

export default class ActivesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const createActive = container.resolve(CreateActiveService);

    const active = await createActive.execute(code);

    return response.status(201).json(active);
  }
}
