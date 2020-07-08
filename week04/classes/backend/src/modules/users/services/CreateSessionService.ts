import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import configAuth from '@config/auth';
import AppError from '@shared/errors/AppError';

interface CreateSessionRequestDto {
  email: string;

  password: string;
}

interface CreateSessionResponseDto {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: CreateSessionRequestDto): Promise<CreateSessionResponseDto> {
    const usersRepository = getRepository(User);

    const findUser = await usersRepository.findOne({ where: { email } });

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
