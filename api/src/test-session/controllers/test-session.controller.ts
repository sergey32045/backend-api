import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SessionService } from '../services/session.service';
import { Session } from '../models/session.entity';
import { SaveSessionAnswerDto, StartSessionDto } from '../validation';

@Controller('sessions')
export class TestSessionController {
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
    return this.sessionService.startSession(data);
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
  async getQuestions(@Request() req, @Param('sessionId') sessionId: string) {
    return this.sessionService.getNextQuestion(sessionId);
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
