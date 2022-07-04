import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/create')
  async createTodo() {
    return this.todoService.addTodo();
  }

  @Patch('/update')
  async updateTodo() {
    return '';
  }

  @Delete('/delete')
  async deleteTodo() {
    return '';
  }
}
