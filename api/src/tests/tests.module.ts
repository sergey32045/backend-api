import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './controllers/test.controller';
import {
  Test,
  Question,
  TestCategory,
  Label,
  Answer,
  Attachment,
  ComplexityLevels,
} from './models/';
import { CategoriesController } from './controllers/categories.controller';
import { QuestionsController } from './controllers/questions.controller';
import { LabelsController } from './controllers/labels.controller';
import { AnswersController } from './controllers/answers.controller';
import { S3FileService } from './S3/s3-file.service';
import { ConfigModule } from '@nestjs/config';
import { AttachmentsController } from './controllers/attachments.controller';
import { AttachmentsService } from './attachments.service';
import { ComplexityLevelsController } from './controllers/complexity-levels.controller';
import { ComplexityLevelsService } from './complexity-levels.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      Test,
      Question,
      TestCategory,
      Label,
      Answer,
      Attachment,
      ComplexityLevels,
    ]),
  ],
  providers: [
    TestService,
    S3FileService,
    AttachmentsService,
    ComplexityLevelsService,
  ],
  controllers: [
    TestController,
    CategoriesController,
    QuestionsController,
    LabelsController,
    AnswersController,
    AttachmentsController,
    ComplexityLevelsController,
  ],
  exports: [TestService, TypeOrmModule],
})
export class TestsModule {}
