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

import Active from '@modules/actives/infra/typeorm/entities/Active';

@Entity('dividends')
export default class UserBond {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  @Exclude()
  active_id: string;

  @OneToOne(() => Active, active => active.id)
  @JoinColumn({ name: 'active_id' })
  active: Active;

  @Column({ enum: ['jscp', 'dividends'] })
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Transform(value => Number(value), { toClassOnly: true })
  value: number;

  @Column()
  @Transform(value => format(value, 'dd/MM/yyyy'), { toClassOnly: true })
  aproved_date: Date;

  @Column()
  @Transform(value => format(value, 'dd/MM/yyyy'), { toClassOnly: true })
  EX_date: Date;

  @Column()
  @Transform(value => format(value, 'dd/MM/yyyy'), { toClassOnly: true })
  pay_date: Date;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}
