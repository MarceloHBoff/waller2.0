import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserBondService from '@modules/bonds/services/CreateUserBondService';
import ListUserBondsService from '@modules/bonds/services/ListUserBondsService';

export default class UserBondsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, buyPrice, nowPrice, dueDate } = request.body;

    const createUserBond = container.resolve(CreateUserBondService);

    const userBond = await createUserBond.execute({
      user_id: request.user.id,
      name,
      dueDate,
      buyPrice,
      nowPrice,
    });

    return response.status(201).json(classToClass(userBond));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUserBond = container.resolve(ListUserBondsService);

    const userBond = await listUserBond.execute(request.user.id);

    return response.status(201).json(classToClass(userBond));
  }
}
