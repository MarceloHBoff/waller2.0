import Active from '../infra/typeorm/entities/Active';

export default interface IActivesRepository {
  findById(id: string): Promise<Active | undefined>;
  findByCode(code: string): Promise<Active | undefined>;
  create(code: string): Promise<Active>;
}
