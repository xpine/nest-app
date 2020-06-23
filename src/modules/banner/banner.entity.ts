import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
    length: 30,
  })
  name: string;

  @Column()
  imgUrl: string;

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
