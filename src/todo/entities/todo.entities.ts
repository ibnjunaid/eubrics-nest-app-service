import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Behaviour } from '../../behaviour/entities/behaviour.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Behaviour)
  behaviour: Behaviour;
}
