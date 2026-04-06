import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../team/domain/team.entity';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  photo!: string;

  @Column({ default: 0 })
  number!: number;

  @Column()
  position!: 'POR' | 'DEF' | 'MED' | 'DEL';

  @Column({ nullable: true })
  age!: number;

  @ManyToOne(() => Team, (t) => t.players, { onDelete: 'SET NULL' })
  team!: Team;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
