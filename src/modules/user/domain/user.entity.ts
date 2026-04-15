import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Notification } from './notification.entity';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
  GUEST = 'guest',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column({ default: false })
  verified_email!: boolean;

  @Column({ nullable: true })
  verification_token!: string;

  @Column({ nullable: true })
  avatar!: string;

  @OneToMany(() => Notification, (n) => n.user)
  notifications!: Notification[];

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role!: UserRole;

  // Se llena automáticamente al insertar el registro
  @CreateDateColumn({
    name: 'created_at', // Optional: keeps database columns snake_case
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  // Se actualiza automáticamente cada vez que haces un .save()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
