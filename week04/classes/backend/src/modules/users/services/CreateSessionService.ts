import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import configAuth from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import ICreateSessionDTO from '../dtos/ICreateSessionDTO';
import ISessionCreatedDTO from '../dtos/ISessionCreatedDTO';

class CreateSessionService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<ISessionCreatedDTO> {
    const findUser = await this.usersRepository.findByEmail(email);

    if (!findUser) {
      throw new AppError('Email/password invalid.');
    }

    const validPassword = await compare(password, findUser.password);

    if (!validPassword) {
      throw new AppError('Email/password invalid.');
    }

    const { secret, expiresIn } = configAuth.jwt;
    const token = sign({}, secret, {
      subject: findUser.id,
      expiresIn,
    });

    return { user: findUser, token };
  }
}

export default CreateSessionService;
