import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetScopedUser } from '../decorators/ScopedUser';
import { CreateTodoDto } from './dto/create-todo.dto';
import { DeleteTodoDto } from './dto/delete-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ScopedUser, TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/list/:behaviourId')
  async ListTodos(
    @Param('behaviourId') behaviourId,
    @GetScopedUser() user: ScopedUser,
  ) {
    return this.todoService.listTodos(behaviourId, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createTodo(
    @Body() createTodo: CreateTodoDto,
    @GetScopedUser() user: ScopedUser,
  ) {
    return this.todoService.addTodo(createTodo, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateTodo(
    @Body() updateTodoDto: UpdateTodoDto,
    @GetScopedUser() user: ScopedUser,
  ) {
    return this.todoService.updateTodo(updateTodoDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteTodo(
    @Body() deleteTodo: DeleteTodoDto,
    @GetScopedUser() user: ScopedUser,
  ) {
    return this.todoService.deleteTodo(deleteTodo, user);
  }
}
