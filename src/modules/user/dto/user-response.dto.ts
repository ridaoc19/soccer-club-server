export class UserResponseDto {
  id!: number;
  email!: string;
  name!: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
