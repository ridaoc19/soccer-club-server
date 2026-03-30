import { Router } from 'express';
import { AppDataSource } from '../../../app/data-source';
import { User } from '../domain/user.entity';
import { UsersRepository } from './user.repository';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { LoginUserUseCase } from '../application/login-user.usecase';
import { UsersController } from './user.controller';

const router = Router();

const repo = new UsersRepository(AppDataSource.getRepository(User));
const createUser = new CreateUserUseCase(repo);
const loginUser = new LoginUserUseCase(repo);
const controller = new UsersController(createUser, loginUser);

router.post('/', controller.create);
router.get('/', controller.getAll);

export { router };
