import { Exclude, Expose } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import UploadConfig from '@config/upload';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar)
      return `${process.env.BACK_END_URL}/files/placeholder.png`;

    switch (UploadConfig.driver) {
      case 'disk':
        return `${process.env.BACK_END_URL}/files/${this.avatar}`;
      default:
        return null;
    }
  }
}
