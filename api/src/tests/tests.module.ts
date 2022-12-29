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
  Position,
} from './models/';
import { CategoriesController } from './controllers/categories.controller';
import { QuestionsController } from './controllers/questions.controller';
import { LabelsController } from './controllers/labels.controller';
import { AnswersController } from './controllers/answers.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { S3FileService } from './S3/s3-file.service';
import { ConfigModule } from '@nestjs/config';
import { AttachmentsController } from './controllers/attachments.controller';
import { AttachmentsService } from './attachments.service';
import { PositionsController } from './controllers/positions.controller';
import { PositionsService } from './positions.service';

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
      Position,
    ]),
  ],
  providers: [
    TestService,
    S3FileService,
    AttachmentsService,
    PositionsService,
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
    AttachmentsController,
    PositionsController,
  ],
  exports: [TestService, TypeOrmModule],
})
export class TestsModule {}
