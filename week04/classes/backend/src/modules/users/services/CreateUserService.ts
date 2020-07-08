import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserCreatedDTO from '../dtos/IUserCreatedDTO';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<IUserCreatedDTO> {
    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail) {
      throw new AppError('Email already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const userCreated: IUserCreatedDTO = {
      id: user.id,
      avatar: user.avatar,
      createdAt: user.createdAt,
      email: user.email,
      name: user.name,
      updatedAt: user.updatedAt,
    };

    return userCreated;
  }
}
