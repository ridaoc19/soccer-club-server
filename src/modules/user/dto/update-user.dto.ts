import { IsEmail, IsString, IsOptional, MaxLength, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(60, { message: 'El nombre es muy largo' })
  name?: string;

  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacía' })
  @MinLength(9, { message: 'El teléfono debe tener al menos 9 caracteres' })
  phone!: string;

  @IsOptional()
  @IsString({ message: 'El avatar debe ser una cadena de texto' })
  avatar?: string;
}
