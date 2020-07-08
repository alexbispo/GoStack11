import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import configUpload from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

usersRoutes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  const newUser = await createUserService.execute({ name, email, password });

  delete newUser.password;

  return res.json(newUser);
});

const upload = multer(configUpload);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: req.user.id,
      avatarFileName: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  },
);

export default usersRoutes;
