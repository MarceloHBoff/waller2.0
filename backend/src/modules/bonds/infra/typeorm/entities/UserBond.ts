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

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('user_bonds')
export default class UserBond {
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
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(value => Number(value), { toClassOnly: true })
  buy_price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(value => Number(value), { toClassOnly: true })
  now_price: number;

  @Column()
  @Transform(value => format(value, 'dd/MM/yyyy'), { toClassOnly: true })
  due_date: Date;

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
