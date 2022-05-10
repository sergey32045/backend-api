import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Query, Post, Body, Put, Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TestService } from '../test.service';
import {CreateTestDto} from "../validation/CreateTestDto";
import {UpdateTestDto} from "../validation/UpdateTestDto";

@Controller('tests')
export class CategoriesController {
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

  @Put()
  async update(@Body() testData: UpdateTestDto, @Param('id') id: number) {
    return this.testService.update(id, testData);
  }
}
