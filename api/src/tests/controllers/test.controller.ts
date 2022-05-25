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

@Controller('tests')
export class TestController {
  constructor(private testService: TestService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req, @Query('categoryId') categoryId?: number) {
    return this.testService.findAll(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() testData: CreateTestDto) {
    return this.testService.create(testData);
  }

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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.testService.findOne(id);
  }
}
