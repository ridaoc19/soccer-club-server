import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification.entity';
import { Role } from './role.entity';

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

  @Column({ default: false })
  verified_email!: boolean;

  @Column({ nullable: true })
  verification_token!: string;

  @Column({ nullable: true })
  avatar!: string;

  @OneToMany(() => Notification, (n) => n.user)
  notifications!: Notification[];

  @ManyToMany(() => Role)
  @JoinTable()
  roles!: Role[];
}
