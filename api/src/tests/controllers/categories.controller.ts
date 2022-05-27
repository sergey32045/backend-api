import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Post, Body, Put, Param, Delete, Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TestService } from '../test.service';
import {CreateCategoryDto} from "../validation/CreateCategoryDto";
import {ApiResponse} from "@nestjs/swagger";
import {TestCategory} from "../models/test-category.entity";
import {QueryCategoriesDto} from "../validation/QueryCategoriesDto";

@Controller('test-categories')
export class CategoriesController {
  constructor(private testService: TestService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll(
      @Request() req,
      @Query() query: QueryCategoriesDto
  ) {
    return this.testService.findAllCategories(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() categoryData: CreateCategoryDto) {
    return this.testService.createCategory(categoryData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() categoryData: CreateCategoryDto, @Param('id') id: number) {
    return this.testService.updateCategory(id, categoryData);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: TestCategory,
  })
  async get(@Param('id') id: number) {
    return this.testService.findOneCategory(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.testService.deleteCategory(id);
  }
}
