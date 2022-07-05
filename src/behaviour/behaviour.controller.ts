import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BehavioursService } from './behaviour.service';
import { CreateBehaviourDto } from './dto/create-behaviour.dto';

@Controller('behaviour')
export class BehavioursController {
  constructor(private readonly behaviourService: BehavioursService) {}

  @Get('/all')
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
