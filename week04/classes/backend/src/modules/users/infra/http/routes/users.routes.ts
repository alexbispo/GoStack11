import { Router } from 'express';
import multer from 'multer';
import configUpload from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersControllers';

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post('/', usersController.create);

const upload = multer(configUpload);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersController.updateAvatar,
);

export default usersRoutes;
