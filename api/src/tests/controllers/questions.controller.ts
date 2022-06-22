import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseInterceptors,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TestService } from '../test.service';
import { ApiResponse } from '@nestjs/swagger';
import { Test } from '../models/test.entity';
import { Question } from '../models/question.entity';
import {
  CreateQuestionDto,
  UpdateQuestionDto,
  GetQuestionsParams,
} from '../validation';
import { Roles } from '../../auth/rbac/roles.decorator';
import { Role } from '../../auth/rbac/role.enum';

@Controller('tests/:testid/questions')
export class QuestionsController {
  constructor(private testService: TestService) {}

  @ApiResponse({
    status: 200,
    description: 'Question records',
    type: [Question],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Request() req, @Param() params: GetQuestionsParams) {
    return this.testService.getQuestions(params);
  }

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Question,
  })
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() data: CreateQuestionDto,
    @Param('testid') testId: number,
  ) {
    return this.testService.createQuestion(testId, data);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() testData: UpdateQuestionDto,
    @Param() params: GetQuestionsParams,
  ) {
    return this.testService.updateQuestion(params.id, testData);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param() params: GetQuestionsParams) {
    return this.testService.deleteQuestion(params.id);
  }
}
