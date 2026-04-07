import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email!: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name!: string;

  // @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  // @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  // @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  // password!: string;

  @IsOptional()
  @IsString({ message: 'El avatar debe ser una cadena de texto' })
  avatar?: string;
}
