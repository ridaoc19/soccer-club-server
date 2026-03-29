import { Router } from 'express';
import { AppDataSource } from '../../../app/data-source';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { User } from '../domain/user.entity';
import { UsersController } from './user.controller';
import { UsersRepository } from './user.repository';

const router = Router();

const repo = new UsersRepository(AppDataSource.getRepository(User));
const createUser = new CreateUserUseCase(repo);
const controller = new UsersController(createUser);

router.post('/', controller.create);
router.get('/', controller.getAll);

export { router };
