import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './models/user.entity';
import { Position } from './models/positions.entity';
import { UserProfile } from './models/user-profiles.entity';
import { LanguageModule } from 'src/languages/languages.module';
import { UserProfilesService } from './user-profiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Position, UserProfile]),
    LanguageModule,
  ],
  providers: [UsersService, UserProfilesService],
  controllers: [UsersController],
  exports: [UsersService, UserProfilesService, TypeOrmModule],
})
export class UsersModule {}
