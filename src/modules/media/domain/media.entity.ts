import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  @Column({ nullable: true })
  originalName!: string;

  @Column()
  mimetype!: string;

  @Column({ default: 0 })
  size!: number;

  @Column()
  url!: string;

  @Column({ default: 'image' })
  type!: 'image' | 'video';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
