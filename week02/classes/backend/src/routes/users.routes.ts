import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import configUpload from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoutes = Router();

usersRoutes.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const newUser = await createUserService.execute({ name, email, password });

    delete newUser.password;

    return res.json(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

const upload = multer(configUpload);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();

      const user = await updateUserAvatarService.execute({
        userId: req.user.id,
        avatarFileName: req.file.filename,
      });

      delete user.password;

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
);

export default usersRoutes;
