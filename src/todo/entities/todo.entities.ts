import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Behaviour } from '../../behaviours/entities/behaviour.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column({ default: false })
  userId: boolean;

  @OneToOne(() => Behaviour)
  @JoinColumn()
  behaviour: Behaviour;
}
