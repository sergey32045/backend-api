import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SessionService } from '../services/session.service';
import { Session } from '../models/session.entity';
import { SaveSessionAnswerDto, StartSessionDto } from '../validation';
import { Roles } from 'src/auth/rbac/roles.decorator';
import { Role } from 'src/auth/rbac/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/rbac/roles.guard';

@Controller('sessions')
export class TestSessionController {
  constructor(private sessionService: SessionService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'Session record',
    type: Session,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':sessionId/next-question')
  async getNextQuestion(@Request() req, @Param('sessionId') sessionId: string) {
    return this.sessionService.getNextQuestion(sessionId);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
