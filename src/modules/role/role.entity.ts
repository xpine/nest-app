import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Menu } from '../menu/menu.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  name: string;

  @Column({
    default: true,
  })
  editable: boolean;

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

  @ManyToMany(type => Menu)
  @JoinTable()
  menus: Menu[];
}
