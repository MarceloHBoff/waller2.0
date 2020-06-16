import { injectable, inject } from 'tsyringe';

import Active from '../infra/typeorm/entities/Active';
import IActivesRepository from '../repositories/IActivesRepository';

@injectable()
export default class CreateActiveService {
  constructor(
    @inject('ActivesRepository')
    private activesRepository: IActivesRepository,
  ) {}

  public async execute(code: string): Promise<Active> {
    const findActive = await this.activesRepository.findByCode(code);

    if (findActive) return findActive;

    const active = await this.activesRepository.create(code);

    return active;
  }
}
