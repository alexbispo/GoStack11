import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const createSessionService = new CreateSessionService();
    const { user } = await createSessionService.execute({ email, password });

    delete user.password;

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionsRoutes;
