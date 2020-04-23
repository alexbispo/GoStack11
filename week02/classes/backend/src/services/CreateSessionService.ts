import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/User';

interface CreateSessionRequestDto {
  email: string;

  password: string;
}

interface CreateSessionResponseDto {
  user: User;
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

    return { user: findUser };
  }
}

export default CreateSessionService;
