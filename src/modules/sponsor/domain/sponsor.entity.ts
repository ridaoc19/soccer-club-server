import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sponsors')
export class Sponsor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  logo!: string;

  @Column({ nullable: true })
  website!: string;

  @Column({ nullable: true })
  category!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  contractValue!: number;

  @Column({ default: 'active' })
  status!: 'active' | 'expired';

  @Column({ default: 'partner' })
  type!: 'main' | 'sub' | 'partner';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
