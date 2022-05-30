import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Post, Body, Put, Param, Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TestService } from '../test.service';
import {ApiResponse} from "@nestjs/swagger";
import {Test} from "../models/test.entity";
import {Question} from "../models/question.entity";
import {CreateQuestionDto} from "../validation/CreateQuestionDto";
import {UpdateQuestionDto} from "../validation/UpdateQuestionDto";

@Controller('tests/:testid/questions')
export class QuestionsController {
  constructor(private testService: TestService) {}

  @ApiResponse({
    status: 200,
    description: 'Test records',
    type: [Question],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Request() req, @Param('testid') testId: number) {
    return this.testService.getQuestions(testId);
  }

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Question,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateQuestionDto, @Param('testid') testId: number) {
    return this.testService.createQuestion(testId, data);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() testData: UpdateQuestionDto, @Param('id') id: number) {
    return this.testService.updateQuestion(id, testData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.testService.delete(id);
  }
}
