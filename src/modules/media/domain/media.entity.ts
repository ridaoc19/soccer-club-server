import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  filename!: string;

  @Column({ nullable: true })
  originalName!: string;

  @Column({ default: 'image/jpeg' })
  mimetype!: string;

  @Column({ default: 0 })
  size!: number;

  @Column()
  url!: string;

  @Column({ default: 'image' })
  type!: 'image' | 'video';

  /** Indica si esta imagen está siendo usada en alguna entidad */
  @Column({ default: false })
  inUse!: boolean;

  /** Referencia opcional: qué entidad/campo la usa (ej: "player:5", "news:3") */
  @Column({ nullable: true })
  usedBy!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
