import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Season } from '../../season/domain/season.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  country!: string;

  @Column()
  category!: string;

  @Column()
  logo!: string;

  @OneToMany(() => Season, (s: Season) => s.league)
  seasons!: Season[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
