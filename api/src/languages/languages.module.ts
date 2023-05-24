import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './models/languages.entity';
import { LanguagesController } from './controllers/languages.controller';
import { LanguagesService } from './services/languages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguagesService],
  controllers: [LanguagesController],
  exports: [TypeOrmModule],
})
export class LanguageModule {}
