export class RequestResetPasswordDto {
  // @IsEmail({}, { message: 'El formato del correo no es válido' })
  // @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email!: string;
}
