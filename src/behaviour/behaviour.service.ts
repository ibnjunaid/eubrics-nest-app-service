import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Behaviour } from './entities/behaviour.entity';
import { CreateBehaviourDto } from './dto/create-behaviour.dto';

@Injectable()
export class BehavioursService {
  constructor(
    @InjectRepository(Behaviour)
    private behaviourRepository: Repository<Behaviour>,
  ) {}

  async addBehaviour(createBehaviour: CreateBehaviourDto) {
    const behaviour = this.behaviourRepository.create();
    behaviour.name = createBehaviour.name;
    const savedBehaviour = await this.behaviourRepository.save(behaviour);
    if (savedBehaviour === behaviour) {
      return {
        message: 'Behaviour saved sucessfully',
      };
    } else {
      throw new HttpException(
        'Error saving behaviour to database',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  getAllBehaviours(): any {
    return this.behaviourRepository.find();
  }

  async populateBehaviours() {
    const behaviourNames = [
      'Making Decisions',
      'Thinking Laterally',
      'Influencing & Negotiating',
      'Managing Conflict',
      'Driving Results',
    ];
    const behaviours = behaviourNames.map((behaviourName: string) => {
      const behaviour = this.behaviourRepository.create();
      behaviour.name = behaviourName;
      return behaviour;
    });
    const insertedEntries = await this.behaviourRepository.save(behaviours);
    if (insertedEntries.length === behaviours.length) {
      return {
        message: 'Sucessfully populated the database with behaviours',
      };
    } else {
      throw new HttpException(
        'Error populating the database with behaviours',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
