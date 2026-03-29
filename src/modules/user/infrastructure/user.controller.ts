import { Request, Response } from 'express';
import { CreateUserUseCase } from '../application/create-user.usecase';

export class UsersController {
  constructor(private createUser: CreateUserUseCase) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const user = await this.createUser.execute(req.body as { email: string });
    res.json(user);
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.createUser.usersRepo.findAll();
    // const users = await this.createUser['usersRepo'].findAll();
    res.json(users);
  };
}
