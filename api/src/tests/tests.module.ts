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
import { Answer } from './models/answer.entity';
import { AnswersController } from './controllers/answers.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { S3FileService } from './S3/s3-file.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Test, Question, TestCategory, Label, Answer]),
  ],
  providers: [
    TestService,
    S3FileService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [
    TestController,
    CategoriesController,
    QuestionsController,
    LabelsController,
    AnswersController,
  ],
  exports: [TestService, TypeOrmModule],
})
export class TestsModule {}
