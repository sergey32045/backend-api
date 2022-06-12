import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  Session,
  SessionAnswer,
  SessionQuestion,
} from './models/session.entity';
import { TestSessionController } from './controllers/test-session.controller';
import { SessionService } from './services/session.service';
import { TestsModule } from '../tests/tests.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, SessionQuestion, SessionAnswer]),
    TestsModule,
  ],
  providers: [SessionService],
  controllers: [TestSessionController],
  exports: [SessionService, TypeOrmModule],
})
export class SessionsModule {}
