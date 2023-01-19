import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './models';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './validation/CreatePositionDto';
import { CreateLabelDto } from './validation/CreateLabelDto';

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

  async deletePosition(id: number) {
    return this.positionRepository.delete(id);
  }

  async updatePosition(id, data: CreateLabelDto) {
    const position = await this.positionRepository.findOne({ where: { id } });
    if (!position) {
      throw new BadRequestException("Position doesn't exists");
    }
    position.title = data.title;
    return this.positionRepository.save(position);
  }
}
