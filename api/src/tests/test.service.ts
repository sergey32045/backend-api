import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import {
  Test,
  TestCategory,
  Question,
  Label,
  Answer,
  Attachment,
  Position,
} from './models';
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
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { CreateLabelDto } from './validation/CreateLabelDto';
import { QueryLabelsDto } from './validation/QueryLabelsDto';

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
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async getAnswers(params: GetAnswersParams): Promise<Answer[]> {
    return this.answerRepository.find({
      where: {
        question_id: params.questionid,
      },
    });
  }

  async createAnswer(params: GetAnswersParams, data: CreateAnswerDto) {
    const question = this.questionRepository.findOne({
      where: { id: params.questionid },
    });
    if (!question) {
      throw new BadRequestException("Question doesn't exists");
    }

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

  async getQuestion(id: number): Promise<Question> {
    return await this.questionRepository
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.tests', 'tests')
      .leftJoinAndSelect('questions.attachments', 'files')
      .leftJoinAndSelect('questions.positions', 'positions')
      .leftJoinAndSelect('questions.labels', 'labels')
      .where({ id })
      .getOne();
  }

  async getQuestions(params: GetQuestionsParams): Promise<Question[]> {
    return await this.questionRepository
      .createQueryBuilder('questions')
      .innerJoin('question_test', 'qt', 'qt.question_id = questions.id')
      .leftJoinAndSelect('questions.positions', 'positions')
      .where('qt.test_id = :testId', { testId: params.testid })
      .getMany();
  }

  async updateQuestion(
    id: number,
    data: UpdateQuestionDto,
  ): Promise<[Question, Attachment[]]> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['answers', 'attachments'],
    });
    const oldAttachments = question.attachments;

    if (!question) {
      throw new BadRequestException("Question doesn't exists");
    }

    question.question = data.question;
    question.is_multiselect = data.is_multiselect;
    question.title = data.title;

    if (
      !data.is_multiselect &&
      question.answers?.filter((answer) => answer.is_correct).length > 1
    ) {
      throw new BadRequestException('Question has more than one answer');
    }

    if (data.labels) {
      const labels = await this.labelRepository.find({
        where: { id: In(data.labels) },
      });
      question.labels = labels;
    }
    if (data.testIds) {
      const tests = await this.testsRepository.find({
        where: { id: In(data.testIds) },
      });
      question.tests = tests;
    }
    if (data.files) {
      const attachments = await this.attachmentRepository.find({
        where: { id: In(data.files) },
      });
      question.attachments = attachments;
    }

    if (data.positions) {
      const positions = await this.positionRepository.find({
        where: { id: In(data.positions) },
      });
      question.positions = positions;
    }

    return [await this.questionRepository.save(question), oldAttachments];
  }

  async deleteQuestion(id: number) {
    return this.questionRepository.delete(id);
  }

  async createQuestion(testId: number, data: CreateQuestionDto) {
    const question = new Question();
    question.question = data.question;
    question.title = data.title;
    question.is_multiselect = data.is_multiselect;

    if (data.labels) {
      const labels = await this.labelRepository.find({
        where: { id: In(data.labels) },
      });
      question.labels = labels;
    }

    if (data.testIds) {
      const tests = await this.testsRepository.find({
        where: { id: In(data.testIds) },
      });
      question.tests = tests;
    }
    if (data.files) {
      const attachments = await this.attachmentRepository.find({
        where: { id: In(data.files) },
      });
      question.attachments = attachments;
    }

    if (data.positions) {
      const positions = await this.positionRepository.find({
        where: { id: In(data.positions) },
      });
      question.positions = positions;
    }

    return this.questionRepository.save(question);
  }

  async createLabel(data: { title: string }): Promise<Label> {
    return this.labelRepository.save(data);
  }

  async getLabels({ categoryId }: QueryLabelsDto): Promise<Label[]> {
    let where: FindOptionsWhere<Label> = {};
    if (categoryId) {
      where = { category_id: categoryId };
    }

    return this.labelRepository.find({
      where,
      relations: ['category'],
    });
  }

  async deleteLabel(id: number) {
    return this.labelRepository.delete(id);
  }

  async updateLabel(id, data: CreateLabelDto) {
    console.log(id, 'id');
    const label = await this.labelRepository.findOne({ where: { id } });
    if (!label) {
      throw new BadRequestException("Label doesn't exists");
    }
    label.title = data.title;
    label.category_id = data.category_id;
    return this.labelRepository.save(label);
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
    category.description = categoryData.description;

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
    category.description = categoryData.description;

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
