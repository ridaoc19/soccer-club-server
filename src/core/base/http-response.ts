import { NextFunction, Request, Response } from 'express';

export interface IErrorDetail {
  property: string;
  messages: string[];
}

export interface IBaseResponse {
  success: boolean;
  status: number;
  message: string;
}

export interface ISuccessResponse<T> extends IBaseResponse {
  success: true;
  data: T;
}

export interface IErrorResponse extends IBaseResponse {
  success: false;
  errors: IErrorDetail[];
}

/**
 * AppResponse: Clase centralizada para gestionar todas las respuestas y errores de la API.
 */
export class AppResponse extends Error {
  constructor(
    public override readonly message: IErrorResponse['message'],
    public readonly status: IErrorResponse['status'] = 400,
    public readonly errors: IErrorResponse['errors'] = [],
  ) {
    super(message);
    Object.setPrototypeOf(this, AppResponse.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  // * --- MÉTODOS DE ÉXITO ---

  /** [200 OK] Retorna una respuesta exitosa con datos. */
  static ok<T>(res: Response, data: T, message = 'Operación exitosa'): Response {
    const response: ISuccessResponse<T> = { success: true, status: 200, message, data };
    return res.status(200).json(response);
  }

  /** [201 Created] Retorna una respuesta de éxito tras la creación de un recurso. */
  static created<T>(res: Response, data: T, message = 'Recurso creado'): Response {
    const response: ISuccessResponse<T> = { success: true, status: 201, message, data };
    return res.status(201).json(response);
  }

  // ! --- MÉTODOS DE ERROR ---

  /** [400 Bad Request] Lanza un error cuando los datos de la petición son inválidos. */
  static badRequest(msg: string, errors: IErrorResponse['errors'] = []): AppResponse {
    return new AppResponse(msg, 400, errors);
  }

  /** [401 Unauthorized] Lanza un error por falta de autenticación o credenciales inválidas. */
  static unauthorized(msg = 'No autorizado. Inicie sesión.'): AppResponse {
    return new AppResponse(msg, 401);
  }

  /** [403 Forbidden] Lanza un error cuando el usuario no tiene permisos para el recurso. */
  static forbidden(msg = 'No tienes permisos para realizar esta acción'): AppResponse {
    return new AppResponse(msg, 403);
  }

  /** [404 Not Found] Lanza un error cuando el recurso solicitado no existe. */
  static notFound(msg = 'Recurso no encontrado'): AppResponse {
    return new AppResponse(msg, 404);
  }

  /** [409 Conflict] Lanza un error cuando existe un conflicto de estado (ej: duplicados). */
  static conflict(msg: string): AppResponse {
    return new AppResponse(msg, 409);
  }

  /** [500 Internal Server Error] Lanza un error genérico ante fallos críticos del servidor. */
  static internal(msg = 'Error interno del servidor'): AppResponse {
    return new AppResponse(msg, 500);
  }

  // ? --- MIDDLEWARE ---

  /** [Global Handler] Middleware final de Express que procesa y unifica todas las respuestas de error. */
  static errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction): Response => {
    if (err instanceof AppResponse) {
      const errorGlobal: IErrorResponse = {
        success: false,
        message: err.message,
        errors: err.errors,
        status: err.status,
      };
      return res.status(err.status).json(errorGlobal);
    }

    console.error(err);
    return res.status(500).json({
      message: 'Error interno del servidor',
      success: false,
      status: 500,
      errors: [],
    });
  };
}
