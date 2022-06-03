import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './controllers/test.controller';
import { Test } from './models/test.entity';
import { Question } from './models/question.entity';
import { TestCategory } from './models/test-category.entity';
import { CategoriesController } from './controllers/categories.controller';
import { Label } from './models/label.entity';
import { QuestionsController } from './controllers/questions.controller';
import { LabelsController } from './controllers/labels.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question, TestCategory, Label])],
  providers: [TestService],
  controllers: [
    TestController,
    CategoriesController,
    QuestionsController,
    LabelsController,
  ],
  exports: [TestService, TypeOrmModule],
})
export class TestsModule {}
