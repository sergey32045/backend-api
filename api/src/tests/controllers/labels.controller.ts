import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TestService } from '../test.service';
import { Label } from '../models';
import { Roles, Role } from '../../auth/rbac';
import { CreateLabelDto, QueryLabelsDto } from '../validation';

@Controller('labels')
export class LabelsController {
  constructor(private testService: TestService) {}

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Label,
  })
  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateLabelDto) {
    return this.testService.createLabel(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Labels records',
    type: [Label],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Request() req, @Query() query: QueryLabelsDto) {
    return this.testService.getLabels(query);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param() id: number) {
    return this.testService.deleteLabel(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: CreateLabelDto) {
    return this.testService.updateLabel(id, data);
  }
}
