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

  @Column({ default: 'partner' })
  type!: 'main' | 'sub' | 'partner';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
