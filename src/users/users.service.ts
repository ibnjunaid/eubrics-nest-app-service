import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../utils/hash';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUser: createUserDto) {
    const user = this.userRepository.create();
    user.name = createUser.name;
    user.password = await hashPassword(createUser.password);
    const savedUser = await this.userRepository.save(user);
    delete savedUser.password;
    return savedUser;
  }

  async findOne(userName: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ name: userName });
  }
}
