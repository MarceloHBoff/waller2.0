import { Exclude, Transform } from 'class-transformer';
import { format } from 'date-fns';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Active from './Active';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('user_actives')
export default class UserActive {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @Exclude()
  active_id: string;

  @OneToOne(() => Active, active => active.id)
  @JoinColumn({ name: 'active_id' })
  active: Active;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(value => Number(value), { toClassOnly: true })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(value => Number(value), { toClassOnly: true })
  buy_price: number;

  @Column()
  @Transform(value => format(value, 'dd/MM/yyyy'), { toClassOnly: true })
  buy_date: Date;

  @Column({ default: false })
  @Exclude()
  automatic: boolean;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
