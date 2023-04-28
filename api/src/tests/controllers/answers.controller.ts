import {
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
import { Answer, Test } from '../models';
import {
  CreateAnswerDto,
  GetAnswersParams,
  UpdateAnswerDto,
} from '../validation';
import { Roles, Role } from '../../auth/rbac';
import {
  CustomClassSerializerInterceptor,
  CustomSerializeOptions,
} from '../serializers/CustomClassSerializerInterceptor';

@Controller('tests/:testid/questions/:questionid/answers')
export class AnswersController {
  constructor(private testService: TestService) {}

  @ApiResponse({
    status: 200,
    description: 'Answer records',
    type: [Answer],
  })
  @Roles(Role.Guest)
  @UseInterceptors(CustomClassSerializerInterceptor)
  @CustomSerializeOptions({
    getGroupsFromAuthUser: true,
  })
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
