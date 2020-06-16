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

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({
    enum: ['Acao', 'Stock', 'ETF', 'FII', 'Reit', 'Bond'],
    default: 'Acao',
  })
  type: string;

  @Column({ precision: 5, scale: 2 })
  price: number;

  @Column({ precision: 5, scale: 2 })
  lastPrice: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}