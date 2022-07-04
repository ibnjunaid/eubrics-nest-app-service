import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Behaviour } from '../behaviours/entities/behaviour.entity';
import { Todo } from './entities/todo.entities';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(Behaviour)
    private behaviourRepository: Repository<Behaviour>,
  ) {}

  async addTodo() {
    const todo = this.todoRepository.create();
    todo.message = 'hello';
    const behaviour = await this.behaviourRepository.findOneBy({
      id: 1,
      isDisabled: false,
    });
    todo.behaviour = behaviour;
    return this.todoRepository.save(todo);
  }
}
