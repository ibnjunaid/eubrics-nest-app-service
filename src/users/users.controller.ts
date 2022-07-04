import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  async signUp(@Body() createUser: createUserDto) {
    return this.userService.createUser(createUser);
  }
}
