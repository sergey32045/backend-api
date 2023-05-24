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
import { ApiResponse } from '@nestjs/swagger';
import { Roles, Role } from '../../auth/rbac';
import { ComplexityLevels } from '../models';
import { CreateComplexityLevelDto } from '../validation/CreateComplexityLevelDto';
import { ComplexityLevelsService } from '../complexity-levels.service';

@Controller('complexity-levels')
export class ComplexityLevelsController {
  constructor(private complexityLevelService: ComplexityLevelsService) {}

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: ComplexityLevels,
  })
  @Roles(Role.Admin)
  @Post()
  async create(@Body() data: CreateComplexityLevelDto) {
    return this.complexityLevelService.create(data);
  }

  @ApiResponse({
    status: 200,
    description: 'Position records',
    type: [ComplexityLevels],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Request() req) {
    return this.complexityLevelService.getLevels();
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param() id: number) {
    return this.complexityLevelService.deleteLevel(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: CreateComplexityLevelDto,
  ) {
    return this.complexityLevelService.updateLevel(id, data);
  }
}
