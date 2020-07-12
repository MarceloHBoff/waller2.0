import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateActiveService from '@modules/actives/services/CreateActiveService';
import CreateUserActiveService from '@modules/actives/services/CreateUserActiveService';
import ListUserActivesService from '@modules/actives/services/ListUserActivesService';
import UpdateUserActivesService from '@modules/actives/services/UpdateUserActivesService';

export default class ActivesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code, quantity, buyPrice } = request.body;

    const createActive = container.resolve(CreateActiveService);

    await createActive.execute(code, '');

    const createUserActive = container.resolve(CreateUserActiveService);

    const userActive = await createUserActive.execute({
      user_id: request.user.id,
      code,
      quantity,
      buyPrice,
    });

    return response.status(201).json(classToClass(userActive));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserActives = container.resolve(ListUserActivesService);

    const userActives = await listUserActives.execute(request.user.id);

    return response.status(200).json(classToClass(userActives));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserActives = container.resolve(UpdateUserActivesService);

    const updatedUserActives = await updateUserActives.execute(request.user.id);

    return response.status(201).json(classToClass(updatedUserActives));
  }
}
