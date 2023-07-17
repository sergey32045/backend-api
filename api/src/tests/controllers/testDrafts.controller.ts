import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Request,
    UseInterceptors,
    Query,
    Post,
    Body,
    Put,
    Param,
    Req,
    Delete,
  } from '@nestjs/common';
  import { TestService } from '../test.service';
  import { AttachmentsService } from '../attachments.service';
  import { CreateTestDto, UpdateTestDto, QueryTestsDto, UpdateAnswerDto, GetAnswersParams, CreateAnswerDto, CreateQuestionDto, UpdateQuestionDto, GetQuestionsParams } from '../validation';
  import { ApiResponse } from '@nestjs/swagger';
  import { AnswerDraft, Question, Test } from '../models';
  import { Role, Roles } from '../../auth/rbac';
  
  @Controller('testDrafts')
  export class TestDraftsController {
    constructor(
        private testService: TestService,
        private attachmentService: AttachmentsService
    ) {}
  
    @ApiResponse({
      status: 201,
      description: 'The found record',
      type: Test,
    })
    @Roles(Role.Admin)
    @Post(':testId')
    async createPublish(@Req() req, @Param('testId') testId: number,) {
      return this.testService.publishDraft(testId);
    }

    @ApiResponse({
      status: 201,
      description: 'The found record',
      type: Test,
    })
    @Roles(Role.Admin)
    @Post(':testId')
    async create(@Req() req, @Param('testId') testId: number,) {
      return this.testService.createDraft(testId);
    }
  
    @ApiResponse({
      status: 200,
      description: 'The found record',
      type: Test,
    })
    @Roles(Role.Admin)
    @Put(':testId')
    async update(@Body() testData: UpdateTestDto, @Param('testId') testId: number) {
      return this.testService.updateDraft(testId, testData);
    }
  
    @Roles(Role.Admin)
    @Delete(':testId')
    async delete(@Param('testId') testId: number) {
      return this.testService.deleteDraft(testId);
    }

    @ApiResponse({
        status: 201,
        description: 'The found record',
        type: Question,
      })
      @Roles(Role.Admin)
      @Post()
      async createQuestion(
        @Body() data: CreateQuestionDto,
      ) {
        return this.testService.createDraftQuestion(data);
      }
    
      @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Test,
      })
      @Roles(Role.Admin)
      @Put(':id')
      async updateQuestion(
        @Body() testData: UpdateQuestionDto,
        @Param() params: GetQuestionsParams,
      ) {
        const [, oldAttachments] = await this.testService.updateDraftQuestion(
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
      async deleteQuestion(@Param() params: GetQuestionsParams) {
        return this.testService.deleteDraftQuestion(params.id);
      }

    @ApiResponse({
        status: 201,
        description: 'The found record',
        type: AnswerDraft,
      })
      @Roles(Role.Admin)
      @Post()
      async createAnswer(
        @Body() data: CreateAnswerDto,
        @Param() params: GetAnswersParams,
      ) {
        return this.testService.createDraftAnswer(params, data);
      }
    
      @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Test,
      })
      @Roles(Role.Admin)
      @Put(':id')
      async updateAnswer(
        @Body() data: UpdateAnswerDto,
        @Param() params: GetAnswersParams,
      ) {
        return this.testService.updateDraftAnswer(params.id, data);
      }
    
      @Roles(Role.Admin)
      @Delete(':id')
      async deleteAnswer(@Param() params: GetAnswersParams) {
        return this.testService.deleteDraftAnswer(params.id);
      }
  }
  