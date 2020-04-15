import { Request, Response } from 'express';
import createUser from '../services/CreateUserService';

const handleHello = (req : Request, res: Response) => {
  const { name } =  req.params;
  const user = createUser({ name });
  res.json(user);
};

export default handleHello;
