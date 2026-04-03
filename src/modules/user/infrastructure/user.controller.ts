import { Request, Response } from 'express';
import { AppResponse } from '../../../core/base/http-response';
import { AuthRequest } from '../../../core/middleware/auth.middleware';
import { ChangePasswordUseCase } from '../application/change-password.usecase';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { DeleteUserUseCase } from '../application/delete-user.usecase';
import { GetUserUseCase } from '../application/get-user.usecase';
import { ILoginResponse, LoginUserUseCase } from '../application/login-user.usecase';
import { UpdateUserUseCase } from '../application/update-user.usecase';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UsersController {
  constructor(
    private createUser: CreateUserUseCase,
    private loginUser: LoginUserUseCase,
    private getUser: GetUserUseCase,
    private updateProfile: UpdateUserUseCase,
    private changePassword: ChangePasswordUseCase,
    private deleteUser: DeleteUserUseCase,
  ) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const user = await this.createUser.execute(req.body as CreateUserDto);

    const { password: _, ...userWithoutPassword } = user;
    AppResponse.created(res, userWithoutPassword, 'Usuario creado exitosamente');
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.createUser['usersRepo'].findAll();
    // Remover contraseñas de la respuesta
    const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
    AppResponse.ok(res, usersWithoutPasswords, 'Usuarios obtenidos exitosamente');
  };

  getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = Number(req.user?.id ?? 0);
    const user = await this.getUser.execute(userId);

    const { password: _, ...userWithoutPassword } = user;
    AppResponse.ok(res, userWithoutPassword, 'Perfil obtenido');
  };

  update = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = Number(req.user?.id ?? 0);
    const user = await this.updateProfile.execute(userId, req.body as UpdateUserDto);

    const { password: _, ...userWithoutPassword } = user;
    AppResponse.ok(res, userWithoutPassword, 'Perfil actualizado exitosamente');
  };

  updatePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = Number(req.user?.id ?? 0);
    await this.changePassword.execute(userId, req.body as ChangePasswordDto);
    AppResponse.ok(res, null, 'Contraseña actualizada exitosamente');
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.params['id'] ? Number(req.params['id']) : Number(req.user?.id ?? 0);
    await this.deleteUser.execute(userId);
    AppResponse.ok(res, null, 'Usuario eliminado exitosamente');
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const body = req.body as { email: string; password: string };
    const { user, message } = await this.loginUser.execute(body.email, body.password);
    AppResponse.ok<ILoginResponse['user']>(res, user, message);
  };
}
