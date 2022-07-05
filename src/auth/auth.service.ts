import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { hashPassword } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    const match = await compare(password, user.password);
    if (match) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      userId: user.id,
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(createUser: createUserDto) {
    const user = this.userRepository.create();
    user.username = createUser.username;
    user.password = await hashPassword(createUser.password);
    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username: username });
  }
}
