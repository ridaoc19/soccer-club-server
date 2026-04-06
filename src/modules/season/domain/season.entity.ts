import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { League } from '../../league/domain/league.entity';

@Entity('seasons')
export class Season {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'date', nullable: true })
  startDate!: Date;

  @Column({ type: 'date', nullable: true })
  endDate!: Date;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => League, (l: League) => l.seasons, { onDelete: 'CASCADE' })
  league!: League;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
