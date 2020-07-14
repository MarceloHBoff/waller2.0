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

  @Column({ precision: 10, scale: 2 })
  buyPrice: number;

  @Column({ precision: 10, scale: 2 })
  nowPrice: number;

  @Column()
  dueDate: Date;

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
