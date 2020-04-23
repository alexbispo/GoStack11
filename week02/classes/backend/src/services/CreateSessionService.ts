import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

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
      throw new Error('Email/password invalid.');
    }

    const validPassword = await compare(password, findUser.password);

    if (!validPassword) {
      throw new Error('Email/password invalid.');
    }

    // secret
    // 9f258fda0b0edee6f1a4578d15a4a526
    const token = sign({}, '9f258fda0b0edee6f1a4578d15a4a526', {
      subject: findUser.id,
      expiresIn: '1d',
    });

    return { user: findUser, token };
  }
}

export default CreateSessionService;
