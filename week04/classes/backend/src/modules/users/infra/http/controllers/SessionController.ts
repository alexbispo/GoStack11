import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = container.resolve(CreateSessionService);
    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  }
}
