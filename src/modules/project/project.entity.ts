import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  name: string;

  @Column({
    length: 20,
  })
  desc: string;

  @Column({
    length: 20,
  })
  code: string;

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

  @ManyToOne(type => User)
  @JoinColumn()
  createdBy: User;

  @ManyToMany(
    type => User,
    user => user.projects,
  )
  members: User[];
}
