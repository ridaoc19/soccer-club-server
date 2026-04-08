import { Router } from 'express';
import { AppDataSource } from '../../../app/data-source';
import { asyncHandler } from '../../../core/base/async-handler';
import { authMiddleware } from '../../../core/middleware/auth.middleware';
import { validateDto } from '../../../core/middleware/validation.middleware';
import { ChangePasswordUseCase } from '../application/change-password.usecase';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { DeleteUserUseCase } from '../application/delete-user.usecase';
import { GetUserUseCase } from '../application/get-user.usecase';
import { LoginUserUseCase } from '../application/login-user.usecase';
import { ResetPasswordUseCase } from '../application/reset-password.usecase';
import { UpdateUserUseCase } from '../application/update-user.usecase';
import { User } from '../domain/user.entity';
import { CreateUserDto } from '../dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { LoginDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersController } from './user.controller';
import { UsersRepository } from './user.repository';
import { RequestResetPasswordDto } from '../dto/request-reset-password.dto';

const router = Router();

const repo = new UsersRepository(AppDataSource.getRepository(User));
const createUser = new CreateUserUseCase(repo);
const loginUser = new LoginUserUseCase(repo);
const getUser = new GetUserUseCase(repo);
const updateProfile = new UpdateUserUseCase(repo);
const changePassword = new ChangePasswordUseCase(repo);
const deleteUser = new DeleteUserUseCase(repo);
const resetPassword = new ResetPasswordUseCase(repo);

const controller = new UsersController(
  createUser,
  loginUser,
  getUser,
  updateProfile,
  changePassword,
  deleteUser,
  resetPassword,
);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           example: "juan.perez@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "********"
 *         role:
 *           type: string
 *           enum: [admin, user, editor]
 *           default: user
 *         createdAt:
 *           type: string
 *           format: date-time
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     LoginResponseData:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 *         token:
 *           type: string
 *           description: JWT para autenticación
 *     UpdateUserDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         avatar:
 *           type: string
 *     ChangePasswordDto:
 *       type: object
 *       required:
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           format: password
 *         newPassword:
 *           type: string
 *           format: password
 *     ErrorDetail:
 *       type: object
 *       properties:
 *         property:
 *           type: string
 *         messages:
 *           type: array
 *           items:
 *             type: string
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         status:
 *           type: number
 *         message:
 *           type: string
 *     ApiErrorResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/ApiResponse'
 *         - type: object
 *           properties:
 *             success:
 *               example: false
 *             errors:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ErrorDetail'
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con la gestión de usuarios y autenticación
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema con los datos proporcionados.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       example: true
 *                     status:
 *                       example: 201
 *                     data:
 *                       $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Datos de entrada inválidos (Error de validación)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *       409:
 *         description: Conflicto - El correo electrónico ya está registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
router.post('/register', validateDto(CreateUserDto), asyncHandler(controller.create));

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obtener el perfil del usuario autenticado
 *     description: Retorna la información completa del usuario que ha iniciado sesión.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       example: true
 *                     data:
 *                       $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: No autorizado
 */
router.get('/profile', authMiddleware, asyncHandler(controller.getProfile));

/**
 * @swagger
 * /user/change-password:
 *   put:
 *     summary: Cambiar la contraseña
 *     description: Permite al usuario autenticado cambiar su contraseña actual por una nueva.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordDto'
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 */
router.put('/change-password', authMiddleware, validateDto(ChangePasswordDto), asyncHandler(controller.updatePassword));

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     description: Envía un correo con un enlace para restablecer la contraseña. El enlace expira en 1 hora.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@ejemplo.com"
 *     responses:
 *       200:
 *         description: Correo enviado (respuesta genérica para no revelar si el email existe)
 *       500:
 *         description: Error al enviar el correo
 */
router.post('/reset-password', validateDto(RequestResetPasswordDto), asyncHandler(controller.requestResetPassword));

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica a un usuario y devuelve un token JWT.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       example: true
 *                     status:
 *                       example: 200
 *                     data:
 *                       $ref: '#/components/schemas/LoginResponseData'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiErrorResponse'
 */
router.post('/login', validateDto(LoginDto), asyncHandler(controller.login));

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Actualizar el perfil del usuario
 *     description: Permite al usuario autenticado actualizar su nombre, correo o avatar.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       example: true
 *                     data:
 *                       $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El correo ya está en uso
 */
router.put('/update', authMiddleware, validateDto(UpdateUserDto), asyncHandler(controller.update));

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario del sistema por su ID.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', authMiddleware, asyncHandler(controller.delete));

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los usuarios (Admin)
 *     description: Retorna una lista de todos los usuarios registrados.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     success:
 *                       example: true
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserResponse'
 */
router.get('/', authMiddleware, asyncHandler(controller.getAll));

export { router };
