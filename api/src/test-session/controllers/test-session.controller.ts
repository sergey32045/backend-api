import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SessionService } from '../services/session.service';
import { Session } from '../models/session.entity';
import { SaveSessionAnswerDto, StartSessionDto } from '../../tests/validation';

@Controller('sessions')
export class TestSessionController {
  constructor(private sessionService: SessionService) {}
  @ApiResponse({
    status: 200,
    description: 'Session records',
    type: Session,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async startSession(
      @Request() req,
      @Body() data: StartSessionDto,
  ) {
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
  ) {
    return this.sessionService.saveAnswer(sessionId, data);
  }
}
