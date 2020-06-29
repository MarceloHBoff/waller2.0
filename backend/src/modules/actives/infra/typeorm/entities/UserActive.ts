import { Exclude } from 'class-transformer';
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
  user: Active;

  @Column()
  @Exclude()
  active_id: string;

  @OneToOne(() => Active, active => active.id)
  @JoinColumn({ name: 'active_id' })
  active: Active;

  @Column({ precision: 5, scale: 2 })
  quantity: number;

  @Column({ precision: 5, scale: 2 })
  buyPrice: number;

  @Column({ default: false })
  automatic: boolean;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
