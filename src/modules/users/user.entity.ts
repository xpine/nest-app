import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
    length: 30,
  })
  username: string;

  @Column()
  password: string;
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

  @OneToOne(type => Role)
  @JoinColumn()
  role: Role;
}
