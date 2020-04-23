import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
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

export default usersRouter;
