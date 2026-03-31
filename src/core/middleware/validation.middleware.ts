import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { AppResponse } from '../base/http-response';

type ClassConstructor<T> = new (...args: unknown[]) => T;

export const validateDto = <T extends object>(dtoClass: ClassConstructor<T>) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);
    const validationErrors: ValidationError[] = await validate(dto);

    if (validationErrors.length > 0) {
      const formattedErrors = validationErrors.map((err) => ({
        property: err.property,
        messages: err.constraints ? Object.values(err.constraints) : [],
      }));

      return next(AppResponse.badRequest('Datos de entrada inválidos', formattedErrors));
    }

    req.body = dto;
    next();
  };
};
