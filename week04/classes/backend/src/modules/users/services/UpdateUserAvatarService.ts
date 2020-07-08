import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import configUpload from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUpdateUserAvatarDTO from '../dtos/IUpdateUserAvatarDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserAvatarUpdatedDTO from '../dtos/IUserAvatarUpdatedDTO';

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    avatarFileName,
  }: IUpdateUserAvatarDTO): Promise<IUserAvatarUpdatedDTO> {
    const findUser = await this.usersRepository.findById(userId);

    if (!findUser) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (findUser.avatar) {
      const userAvatarFilePath = path.join(configUpload.dir, findUser.avatar);
      const existsFileInPath = await fs.promises.stat(userAvatarFilePath);

      if (existsFileInPath) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    findUser.avatar = avatarFileName;

    await this.usersRepository.update(findUser);

    return findUser;
  }
}
