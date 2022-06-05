import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
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
import { GetQuestionsParams } from '../validation/GetQuestionsParams';
import {Answer} from "../models/answer.entity";
import {GetAnswersParams} from "../validation/GetAnswersParams";
import {CreateAnswerDto} from "../validation/CreateAnswerDto";
import {UpdateAnswerDto} from "../validation/UpdateAnswerDto";

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
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() data: CreateAnswerDto,
    @Param() params: GetAnswersParams
  ) {
    return this.testService.createAnswer(params, data);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() data: UpdateAnswerDto, @Param() params: GetAnswersParams) {
    return this.testService.updateAnswer(params.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() params: GetAnswersParams) {
    return this.testService.deleteAnswer(params.id);
  }
}
