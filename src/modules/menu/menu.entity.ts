import {
  Entity,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  client: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  icon: string;

  @Column()
  url: string;

  @Column()
  sort: number;

  @TreeChildren()
  children: Menu[];

  @TreeParent()
  parent: Menu;

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
