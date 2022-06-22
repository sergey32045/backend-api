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
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TestService } from '../test.service';
import { ApiResponse } from '@nestjs/swagger';
import { Test } from '../models/test.entity';
import { Answer } from '../models/answer.entity';
import {
  CreateAnswerDto,
  GetAnswersParams,
  UpdateAnswerDto,
} from '../validation';
import { Roles } from '../../auth/rbac/roles.decorator';
import { Role } from '../../auth/rbac/role.enum';

@Controller('tests/:testid/questions/:questionid/answers')
export class AnswersController {
  constructor(private testService: TestService) {}

  @ApiResponse({
    status: 200,
    description: 'Answer records',
    type: [Answer],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Request() req, @Param() params: GetAnswersParams) {
    return this.testService.getAnswers(params);
  }

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Answer,
  })
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() data: CreateAnswerDto,
    @Param() params: GetAnswersParams,
  ) {
    return this.testService.createAnswer(params, data);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() data: UpdateAnswerDto,
    @Param() params: GetAnswersParams,
  ) {
    return this.testService.updateAnswer(params.id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param() params: GetAnswersParams) {
    return this.testService.deleteAnswer(params.id);
  }
}
