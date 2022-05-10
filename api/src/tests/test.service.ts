import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './models/test.entity';
import {FindConditions} from "typeorm/find-options/FindConditions";
import {User} from "../users/models/user.entity";
import {CreateTestDto} from "./validation/CreateTestDto";
import {TestCategory} from "./models/test-category.entity";
import {UpdateTestDto} from "./validation/UpdateTestDto";

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
    @InjectRepository(TestCategory)
    private categoryRepository: Repository<TestCategory>,
  ) {}

  async findAll(categoryId?: number): Promise<Test[]> {
    let where: FindConditions<Test> = {};

    if (categoryId) {
       where = { test_category_id: categoryId }
    }
    return this.testsRepository.find({
      where,
      relations: ['questions', 'category'],
    });
  }

  async findOne(id: number): Promise<Test> {
    return this.testsRepository.findOne(id);
  }

  private async checkData(data: CreateTestDto): Promise<void> {
    if (data.test_category_id) {
      const category = await this.categoryRepository.findOne(data.test_category_id);
      if (!category) {
        throw new BadRequestException('Category doesn\'t exists');
      }
    }
  }

  async create(testData: CreateTestDto): Promise<Test> {
    const test = new Test();
    test.title = testData.title;
    test.description = testData.description;
    test.test_category_id = testData.test_category_id;

    await this.checkData(testData);

    return this.testsRepository.save(test);
  }

  async update(id: number, update: UpdateTestDto) {
    const test = await this.testsRepository.findOne(id);
    if (!test) {
      throw new BadRequestException('Test doesn\'t exists');
    }
    await this.checkData(update);

    test.title = update.title;
    test.description = update.description;
    test.test_category_id = update.test_category_id;

    await this.checkData(update);

    return this.testsRepository.save(test);
  }

  async delete(id: number) {
    return this.testsRepository.delete(id);
  }
}
