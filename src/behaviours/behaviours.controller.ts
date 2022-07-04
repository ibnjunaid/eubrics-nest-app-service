import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BehavioursService } from './behaviours.service';
import { CreateBehaviourDto } from './dto/create-behaviour.dto';

@Controller('behaviours')
export class BehavioursController {
  constructor(private readonly behaviourService: BehavioursService) {}

  @Get()
  getAllBehaviours(): string[] {
    return this.behaviourService.getAllBehaviours();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addBehaviours(@Body() createBehaviour: CreateBehaviourDto) {
    return this.behaviourService.addBehaviour(createBehaviour);
  }

  @Get('/populate')
  populateBehaviours() {
    return this.behaviourService.populateBehaviours();
  }
}
