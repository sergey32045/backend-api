import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComplexityLevels } from './models';
import { Repository } from 'typeorm';
import { CreateComplexityLevelDto } from './validation/CreateComplexityLevelDto';

@Injectable()
export class ComplexityLevelsService {
  constructor(
    @InjectRepository(ComplexityLevels)
    private complexityLevelRepository: Repository<ComplexityLevels>,
  ) {}

  async create(data: CreateComplexityLevelDto) {
    return this.complexityLevelRepository.save(data);
  }

  async getLevels() {
    return this.complexityLevelRepository.find();
  }

  async deleteLevel(id: number) {
    return this.complexityLevelRepository.delete(id);
  }

  async updateLevel(id, data: CreateComplexityLevelDto) {
    const position = await this.complexityLevelRepository.findOne({
      where: { id },
    });
    if (!position) {
      throw new BadRequestException("Level doesn't exists");
    }
    position.title = data.title;
    return this.complexityLevelRepository.save(position);
  }
}
