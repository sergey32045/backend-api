import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { TestService } from '../test.service';
import { S3FileService } from '../S3/s3-file.service';
import { ApiResponse } from '@nestjs/swagger';
import { Test, Question } from '../models';
import {
  CreateQuestionDto,
  GetQuestionsParams,
  UpdateQuestionDto,
} from '../validation';
import { Roles, Role } from '../../auth/rbac';
import { AttachmentsService } from '../attachments.service';

@Controller('tests/:testid/questions')
export class QuestionsController {
  constructor(
    private testService: TestService,
    private s3FileService: S3FileService,
    private attachmentService: AttachmentsService,
  ) {}

  @Roles(Role.Admin)
  @Post('/upload')
  async generatePreSignedPutUrl(
    @Body() { fileName, fileType }: { fileName: string; fileType: string },
  ) {
    const url = await this.s3FileService.generatePreSignedPutUrl(
      fileName,
      fileType,
    );
    return {
      url,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Question,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.testService.getQuestion(id);
  }

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
    const [, oldAttachments] = await this.testService.updateQuestion(
      params.id,
      testData,
    );

    await this.attachmentService.updateQuestionAttachments(
      oldAttachments,
      testData,
    );
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param() params: GetQuestionsParams) {
    return this.testService.deleteQuestion(params.id);
  }
}
