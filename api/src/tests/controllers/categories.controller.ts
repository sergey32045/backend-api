import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseInterceptors,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TestService } from '../test.service';
import { CreateCategoryDto, QueryCategoriesDto } from '../validation';
import { ApiResponse } from '@nestjs/swagger';
import { TestCategory } from '../models';
import { Roles, Role } from '../../auth/rbac';

@Controller('test-categories')
export class CategoriesController {
  constructor(private testService: TestService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @Roles(Role.Guest)
  @ApiResponse({
    status: 200,
    description: 'Get all categories',
    type: [TestCategory],
  })
  async getAll(@Request() req, @Query() query: QueryCategoriesDto) {
    return this.testService.findAllCategories(query);
  }

  @Roles(Role.Admin)
  @Post()
  async create(@Body() categoryData: CreateCategoryDto) {
    return this.testService.createCategory(categoryData);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() categoryData: CreateCategoryDto,
    @Param('id') id: number,
  ) {
    return this.testService.updateCategory(id, categoryData);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: TestCategory,
  })
  @Roles(Role.Guest)
  async get(@Param('id') id: number) {
    return this.testService.findOneCategory(id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.testService.deleteCategory(id);
  }
}
