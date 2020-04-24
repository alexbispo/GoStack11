import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import configUpload from '../config/upload';

interface UpdateUserAvatarServiceDto {
  userId: string;

  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFileName,
  }: UpdateUserAvatarServiceDto): Promise<User> {
    const usersRepository = getRepository(User);

    const findUser = await usersRepository.findOne(userId);

    if (!findUser) {
      throw new Error('Only authenticated users can change avatar.');
    }

    if (findUser.avatar) {
      const userAvatarFilePath = path.join(configUpload.dir, findUser.avatar);
      const existsFileInPath = await fs.promises.stat(userAvatarFilePath);

      if (existsFileInPath) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    findUser.avatar = avatarFileName;

    await usersRepository.save(findUser);

    return findUser;
  }
}
