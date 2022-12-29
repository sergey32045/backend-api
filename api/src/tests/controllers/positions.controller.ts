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
import { Roles } from '../../auth/rbac/roles.decorator';
import { Role } from '../../auth/rbac/role.enum';
import { Position } from '../models';
import { CreatePositionDto } from '../validation/CreatePositionDto';
import { PositionsService } from '../positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private positionService: PositionsService) {}

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Position,
  })
  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreatePositionDto) {
    return this.positionService.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Position records',
    type: [Position],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Request() req) {
    return this.positionService.getPositions();
  }
}
