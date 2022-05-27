import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Query, Post, Body, Put, Param, Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TestService } from '../test.service';
import {CreateTestDto} from "../validation/CreateTestDto";
import {UpdateTestDto} from "../validation/UpdateTestDto";
import {QueryTestsDto} from "../validation/QueryTestsDto";
import {ApiResponse} from "@nestjs/swagger";
import {Test} from "../models/test.entity";

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
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() testData: CreateTestDto) {
    return this.testService.create(testData);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() testData: UpdateTestDto, @Param('id') id: number) {
    return this.testService.update(id, testData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.testService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Test,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.testService.findOne(id);
  }
}
