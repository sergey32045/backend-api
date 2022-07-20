import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Query,
  Post,
  Body,
  Put,
  Param,
  Req,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TestService } from '../test.service';
import { CreateTestDto, UpdateTestDto, QueryTestsDto } from '../validation';
import { ApiResponse } from '@nestjs/swagger';
import { Test } from '../models/test.entity';
import { Role } from '../../auth/rbac/role.enum';
import { Roles } from '../../auth/rbac/roles.decorator';

@Controller('tests')
export class TestController {
  constructor(private testService: TestService) {}

  @ApiResponse({
    status: 200,
    description: 'Test records',
    type: [Test],
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(@Request() req, @Query() query: QueryTestsDto) {
    return this.testService.findAll(query);
  }

  @ApiResponse({
    status: 201,
    description: 'The found record',
    type: Test,
  })
  @Roles(Role.Admin)
  @Post()
  async create(@Req() req, @Body() testData: CreateTestDto) {
    return this.testService.create(testData);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @Roles(Role.Admin)
  @Put(':id')
  async update(@Body() testData: UpdateTestDto, @Param('id') id: number) {
    return this.testService.update(id, testData);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.testService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.testService.findOne(id);
  }
}
