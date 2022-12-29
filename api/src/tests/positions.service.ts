import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './models';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './validation/CreatePositionDto';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async create(data: CreatePositionDto) {
    return this.positionRepository.save(data);
  }

  async getPositions() {
    return this.positionRepository.find();
  }
}
