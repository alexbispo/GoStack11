import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;

  findById(id: string): Promise<User | undefined>;

  create(dto: ICreateUserDTO): Promise<User>;

  update(user: User): Promise<User>;
}
