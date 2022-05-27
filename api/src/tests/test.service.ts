import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './models/test.entity';
import {FindConditions} from "typeorm/find-options/FindConditions";
import {CreateTestDto} from "./validation/CreateTestDto";
import {TestCategory} from "./models/test-category.entity";
import {UpdateTestDto} from "./validation/UpdateTestDto";
import {CreateCategoryDto} from "./validation/CreateCategoryDto";
import {QueryCategoriesDto} from "./validation/QueryCategoriesDto";
import {QueryTestsDto} from "./validation/QueryTestsDto";

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
    @InjectRepository(TestCategory)
    private categoryRepository: Repository<TestCategory>,
  ) {}

  async findAllCategories(query: QueryCategoriesDto): Promise<TestCategory[]> {
    return this.categoryRepository.find({
      relations: ['parent'],
      take: query.limit,
      skip: query.page - 1
    });
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<TestCategory> {
    const category = new TestCategory();
    category.title = categoryData.title;
    category.name = categoryData.name;
    category.parent_id = categoryData.parent_id;

    await this.checkCategoryData(categoryData)

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number) {
    return this.categoryRepository.delete(id);
  }

  async updateCategory(id: number, categoryData: CreateCategoryDto): Promise<TestCategory> {
    const category = await this.categoryRepository.findOne({ where: {id } });
    if (!category) {
      throw new BadRequestException('Category doesn\'t exists');
    }
    category.title = categoryData.title;
    category.name = categoryData.name;
    category.parent_id = categoryData.parent_id;

    await this.checkCategoryData(categoryData)

    return this.categoryRepository.save(category);
  }

  async findOneCategory(id: number): Promise<TestCategory> {
    return this.categoryRepository.findOne({ where: {id}});
  }

  async findAll(query: QueryTestsDto): Promise<Test[]> {
    let where: FindConditions<Test> = {};

    const { categoryId, page, limit } = query;

    if (categoryId) {
       where = { test_category_id: categoryId }
    }
    return this.testsRepository.find({
      where,
      relations: ['questions', 'category'],
      skip: page - 1,
      take: limit
    });
  }

  async findOne(id: number): Promise<Test> {
    return this.testsRepository.findOne({ where: {id}});
  }

  private async checkCategoryData(categoryData: CreateCategoryDto) {
    if (categoryData.parent_id) {
      const parentCategory = await this.categoryRepository.findOne({ where: { id: categoryData.parent_id } });
      if (!parentCategory) {
        throw new BadRequestException('Parent category doesn\'t exists');
      }
    }
  }

  private async checkTestData(data: CreateTestDto): Promise<void> {
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

    await this.checkTestData(testData);

    return this.testsRepository.save(test);
  }

  async update(id: number, update: UpdateTestDto) {
    const test = await this.testsRepository.findOne(id);
    if (!test) {
      throw new BadRequestException('Test doesn\'t exists');
    }
    await this.checkTestData(update);

    test.title = update.title;
    test.description = update.description;
    test.test_category_id = update.test_category_id;

    await this.checkTestData(update);

    return this.testsRepository.save(test);
  }

  async delete(id: number) {
    return this.testsRepository.delete(id);
  }
}
