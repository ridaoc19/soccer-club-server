import { IsEmail, IsString, IsOptional, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'El formato del correo no es válido' })
  @IsOptional()
  email?: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  @MaxLength(60, { message: 'El nombre es muy largo' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'El avatar debe ser una cadena de texto' })
  avatar?: string;
}
