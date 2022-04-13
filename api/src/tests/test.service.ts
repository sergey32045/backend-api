import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './models/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
  ) {}

  findAll(categoryId?: string): Promise<Test[]> {
    const queryBuilder = this.testsRepository.manager.createQueryBuilder();
    // if (categoryId) {
    //     queryBuilder.where("test_category_id = :categoryId", { categoryId });
    // }
    // queryBuilder.leftJoinAndSelect('tests', 'tests.questions')
    //     .leftJoinAndSelect("questions", "question", "question.test_id = user.id")
    return this.testsRepository.find({
      where: { test_category_id: categoryId },
      relations: ['questions'],
    });
  }

  findOne(id: number): Promise<Test> {
    return this.testsRepository.findOne(id);
  }
}
