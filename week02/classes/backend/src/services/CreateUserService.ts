import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface CreateUserRequestDto {
  name: string;

  email: string;

  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: CreateUserRequestDto): Promise<User> {
    const usersRepository = getRepository(User);

    const findEmail = await usersRepository.findOne({ where: { email } });

    if (findEmail) {
      throw new Error('Email already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
