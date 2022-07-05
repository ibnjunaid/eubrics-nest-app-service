import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async userLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  async signUp(@Body() createUser: createUserDto) {
    return this.authService.createUser(createUser);
  }
}
