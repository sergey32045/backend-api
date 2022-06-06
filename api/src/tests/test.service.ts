import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Test } from './models/test.entity';
import {
  CreateTestDto,
  UpdateTestDto,
  CreateCategoryDto,
  QueryCategoriesDto,
  QueryTestsDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  GetQuestionsParams,
  GetAnswersParams,
  CreateAnswerDto,
  UpdateAnswerDto,
} from './validation';
import { TestCategory } from './models/test-category.entity';
import { Question } from './models/question.entity';
import { Label } from './models/label.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { Answer } from './models/answer.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testsRepository: Repository<Test>,
    @InjectRepository(TestCategory)
    private categoryRepository: Repository<TestCategory>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Label)
    private labelRepository: Repository<Label>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async getAnswers(params: GetAnswersParams): Promise<Answer[]> {
    return this.answerRepository.find({
      where: {
        question_id: params.questionid,
      },
    });
  }

  async createAnswer(params: GetAnswersParams, data: CreateAnswerDto) {
    const answer = new Answer();
    answer.question_id = params.questionid;
    answer.answer = data.answer;
    answer.is_correct = data.isCorrect;

    return this.answerRepository.save(answer);
  }

  async updateAnswer(id: number, data: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOne({ where: { id } });
    if (!answer) {
      throw new BadRequestException("Answer doesn't exists");
    }

    answer.answer = data.answer;
    answer.is_correct = data.isCorrect;

    return this.answerRepository.save(answer);
  }

  async deleteAnswer(id: number) {
    return this.answerRepository.delete(id);
  }

  async getQuestions(params: GetQuestionsParams): Promise<Question[]> {
    return this.questionRepository.find({
      where: {
        test_id: params.testid,
      },
      relations: ['labels'],
    });
  }

  async updateQuestion(id: number, data: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new BadRequestException("Question doesn't exists");
    }

    question.question = data.question;
    question.level = data.level;
    question.is_multiselect = data.is_multiselect;

    if (data.labelIds) {
      const labels = await this.labelRepository.find({
        where: { id: In(data.labelIds) },
      });
      question.labels = labels;
    }

    return this.questionRepository.save(question);
  }

  async deleteQuestion(id: number) {
    return this.questionRepository.delete(id);
  }

  async createQuestion(testId: number, data: CreateQuestionDto) {
    const question = new Question();
    question.question = data.question;
    question.level = data.level;
    question.test_id = testId;
    question.is_multiselect = data.is_multiselect;

    if (data.labelIds) {
      const labels = await this.labelRepository.find({
        where: { id: In(data.labelIds) },
      });
      question.labels = labels;
    }

    return this.questionRepository.save(question);
  }

  async createLabel(data: { title: string }): Promise<Label> {
    if (!data.title) {
      throw new BadRequestException('title is empty');
    }

    return this.labelRepository.save(data);
  }

  async findAllCategories(query: QueryCategoriesDto): Promise<TestCategory[]> {
    return this.categoryRepository.find({
      relations: ['parent'],
      take: query.limit,
      skip: query.page - 1,
    });
  }

  async createCategory(categoryData: CreateCategoryDto): Promise<TestCategory> {
    const category = new TestCategory();
    category.title = categoryData.title;
    category.name = categoryData.name;
    category.parent_id = categoryData.parent_id;

    await this.checkCategoryData(categoryData);

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number) {
    return this.categoryRepository.delete(id);
  }

  async updateCategory(
    id: number,
    categoryData: CreateCategoryDto,
  ): Promise<TestCategory> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new BadRequestException("Category doesn't exists");
    }
    category.title = categoryData.title;
    category.name = categoryData.name;
    category.parent_id = categoryData.parent_id;

    await this.checkCategoryData(categoryData, id);

    return this.categoryRepository.save(category);
  }

  async findOneCategory(id: number): Promise<TestCategory> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async findAll(query: QueryTestsDto): Promise<Test[]> {
    let where: FindOptionsWhere<Test> = {};

    const { categoryId, page, limit } = query;

    if (categoryId) {
      where = { test_category_id: categoryId };
    }
    return this.testsRepository.find({
      where,
      relations: ['questions', 'category'],
      skip: page - 1,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Test> {
    return this.testsRepository.findOne({ where: { id } });
  }

  private async checkCategoryData(
    categoryData: CreateCategoryDto,
    id?: number,
  ) {
    if (categoryData.parent_id) {
      const parentCategory = await this.categoryRepository.findOne({
        where: { id: categoryData.parent_id },
      });
      if (!parentCategory) {
        throw new BadRequestException("Parent category doesn't exists");
      }
    }
    if (categoryData.name) {
      let where = { name: categoryData.name };
      if (id) {
        where['id'] = Not(id);
      }
      const category = await this.categoryRepository.findOne({ where });
      if (category) {
        throw new BadRequestException(
          'Category with this "name" already exists',
        );
      }
    }
  }

  private async checkTestData(data: CreateTestDto): Promise<void> {
    if (data.test_category_id) {
      const category = await this.categoryRepository.findOne({
        where: { id: data.test_category_id },
      });
      if (!category) {
        throw new BadRequestException("Category doesn't exists");
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
    const test = await this.testsRepository.findOne({ where: { id } });
    if (!test) {
      throw new BadRequestException("Test doesn't exists");
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
