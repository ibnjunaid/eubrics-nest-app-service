import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Behaviour } from '../behaviour/entities/behaviour.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entities';

export interface ScopedUser {
  userId: number;
  username: string;
}

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(Behaviour)
    private behaviourRepository: Repository<Behaviour>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async listTodos(scopedUser: ScopedUser) {
    const todoList = await this.todoRepository
      .createQueryBuilder()
      .where('userId = :id', { id: scopedUser.userId })
      .getMany();
    return todoList;
  }

  async addTodo(createTodo: CreateTodoDto, scopedUser: ScopedUser) {
    const todo = this.todoRepository.create();
    todo.message = createTodo.message;
    const behaviour = await this.behaviourRepository.findOneBy({
      id: createTodo.behaviourId,
      isDisabled: false,
    });
    todo.behaviour = behaviour;
    const user = await this.userRepository.findOneBy({
      id: scopedUser.userId,
    });
    todo.user = user;
    const savedTodo = await this.todoRepository.save(todo);
    delete savedTodo.user;
    return savedTodo;
  }

  async deleteTodo(deleteTodo: DeleteTodoDto, scopedUser: ScopedUser) {
    const todoToDelete = await this.todoRepository.findOneBy({
      id: deleteTodo.todoId,
    });
    if (todoToDelete.user.id === scopedUser.userId) {
      const deletedResult = await this.todoRepository.delete(todoToDelete);
      return deletedResult;
    } else {
      throw new ForbiddenException();
    }
  }

  //TODO: Validation that allow only users to delete thier todo
  async updateTodo(updateTodo: UpdateTodoDto, scopedUser: ScopedUser) {
    const todoToUpdate = await this.todoRepository.findOneBy({
      id: updateTodo.todoId,
    });
    todoToUpdate.message = updateTodo.message;
    const savedResult = await this.todoRepository.save(todoToUpdate);
    return savedResult;
  }
}
