import IUpdateActiveDTO from '../dtos/IUpdateActiveDTO';
import Active from '../infra/typeorm/entities/Active';

export default interface IActivesRepository {
  findById(id: string): Promise<Active | undefined>;
  getById(id: string): Promise<Active>;
  findByCode(code: string): Promise<Active | undefined>;
  updatePrice(data: IUpdateActiveDTO): Promise<Active>;
  create(code: string, type: string): Promise<Active>;
}
