import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BehavioursController } from './behaviours/behaviours.controller';
import { BehavioursService } from './behaviours/behaviours.service';
import { Behaviour } from './behaviours/entities/behaviour.entity';
import { Todo } from './todo/entities/todo.entities';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { getDataBaseConfig } from './utils/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      ...getDataBaseConfig(),
      entities: [Behaviour, Todo, User],
    }),
    TypeOrmModule.forFeature([Behaviour, Todo, User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  controllers: [
    AppController,
    BehavioursController,
    TodoController,
    UsersController,
    AuthController,
  ],
  providers: [
    AppService,
    BehavioursService,
    TodoService,
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
