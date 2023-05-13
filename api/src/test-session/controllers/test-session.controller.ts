import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SessionService } from '../services/session.service';
import { Session } from '../models/session.entity';
import {
  SaveSessionAnswerDto,
  StartSessionDto,
  QuerySessionQuestionDto,
} from '../validation';

@Controller('sessions')
export class TestSessionController {
  private readonly LIMIT_QUESTIONS;

  constructor(private sessionService: SessionService) {}

  @ApiResponse({
    status: 201,
    description: 'Session records',
    type: Session,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async startSession(
    @Request() req,
    @Body() data: StartSessionDto,
  ): Promise<Session> {
    return this.sessionService.startSession(req.user, data);
  }

  @ApiResponse({
    status: 200,
    description: 'Session records',
    type: Session,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':sessionId')
  async saveAnswer(
    @Request() req,
    @Param('sessionId') sessionId: string,
    @Body() data: SaveSessionAnswerDto,
  ): Promise<Session> {
    return this.sessionService.saveAnswer(sessionId, data);
  }

  @ApiResponse({
    status: 200,
    description: 'Session record',
    type: Session,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':sessionId/next-question')
  async getNextQuestion(@Request() req, @Param('sessionId') sessionId: string) {
    const {
      questions: [question],
      ...rest
    } = await this.sessionService.getNextQuestion(sessionId, 1);

    return {
      question,
      ...rest,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'Session record',
    type: [Session],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':sessionId/next-questions')
  async getNextQuestions(
    @Request() req,
    @Param('sessionId') sessionId: string,
    @Query() query: QuerySessionQuestionDto,
  ) {
    return this.sessionService.getNextQuestion(
      sessionId,
      this.LIMIT_QUESTIONS,
      query.excludeQuestionIDs,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Session record',
    type: Session,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':sessionId')
  async getSession(@Request() req, @Param('sessionId') sessionId: string) {
    return this.sessionService.getSession(sessionId);
  }
}
