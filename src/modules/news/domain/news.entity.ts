import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/domain/user.entity';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ nullable: true })
  image!: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  author!: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishedAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
