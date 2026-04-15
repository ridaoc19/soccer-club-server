import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Player } from '../../player/domain/player.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  logo!: string;

  @Column({ default: true })
  isClub!: boolean;

  @Column({ nullable: true })
  category!: string;
  
  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  manager!: string;

  @Column({ default: 0 })
  points!: number;

  @OneToMany(() => Player, (p) => p.team)
  players!: Player[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
