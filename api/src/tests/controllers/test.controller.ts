import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { TestService } from '../test.service';

@Controller('tests')
export class TestController {
  constructor(private testService: TestService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getTests(@Request() req, @Query('categoryId') categoryId?: string) {
    return this.testService.findAll(categoryId);
  }
}
