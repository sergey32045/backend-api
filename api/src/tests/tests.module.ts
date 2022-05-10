import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './controllers/test.controller';
import { Test } from './models/test.entity';
import {Question} from "./models/question.entity";
import {TestCategory} from "./models/test-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question, TestCategory])],
  providers: [TestService],
  controllers: [TestController],
  exports: [TestService, TypeOrmModule],
})
export class TestsModule {}
