import { Request, Response } from 'express';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { LoginUserUseCase } from '../application/login-user.usecase';

export class UsersController {
  constructor(
    private createUser: CreateUserUseCase,
    private loginUser: LoginUserUseCase,
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const user = await this.createUser.execute(req.body as { email: string });
    res.json(user);
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.createUser['usersRepo'].findAll();
    res.json(users);
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as { email: string; password: string };
    const user = await this.loginUser.execute(body.email, body.password);
    res.json(user);
  };
}
