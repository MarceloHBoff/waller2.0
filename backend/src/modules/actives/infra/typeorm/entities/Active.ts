import { Exclude, Transform } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('actives')
export default class Active {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({
    enum: ['Acao', 'Stock', 'ETF', 'FII', 'Reit', 'Bond'],
    default: 'Acao',
  })
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(value => Number(value), { toClassOnly: true })
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(value => Number(value), { toClassOnly: true })
  lastPrice: number;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
