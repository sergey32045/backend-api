import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './controllers/test.controller';
import { Test } from './models/test.entity';
import {Question} from "./models/question.entity";
import {TestCategory} from "./models/test-category.entity";
import {CategoriesController} from "./controllers/categories.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question, TestCategory])],
  providers: [TestService],
  controllers: [TestController, CategoriesController],
  exports: [TestService, TypeOrmModule],
})
export class TestsModule {}
