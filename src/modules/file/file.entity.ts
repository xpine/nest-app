import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class OssFile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  url: string;

  @ManyToOne(type => User)
  @JoinColumn()
  createdBy: User;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      from: value => {
        return new Date(value).getTime();
      },
      to: value => value,
    },
  })
  createTime: number;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      from: value => {
        return new Date(value).getTime();
      },
      to: value => value,
    },
  })
  updateTime: number;

  @DeleteDateColumn({
    type: 'timestamp',
    transformer: {
      from: value => {
        return new Date(value).getTime();
      },
      to: value => value,
    },
  })
  deleteTime: number;
}

@Entity()
export class OssConfig {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  accessKeyId: string;

  @Column()
  accessKeySecret: string;

  @Column()
  bucket: string;

  @Column()
  endpoint: string;

  @Column()
  timeout: string;
}
