import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  opponent!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ nullable: true })
  stadium!: string;

  @Column({ default: true })
  isHome!: boolean;

  @Column({ type: 'jsonb', nullable: true })
  lineup!: any[]; // Array of { playerId, x, y }

  @Column({ default: 'scheduled' })
  status!: 'scheduled' | 'live' | 'finished';

  @Column({ default: 0 })
  homeScore!: number;

  @Column({ default: 0 })
  awayScore!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
