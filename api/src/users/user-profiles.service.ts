import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../auth/validation/RegisterUserDto';
import { Role } from '../auth/rbac/role.enum';
import { UserProfile } from './models/user-profiles.entity';
import { UpdateUserProfileDto } from './validation';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private usersProfileRepository: Repository<UserProfile>,
  ) {}

  findOneByUserId(userId: number): Promise<UserProfile> {
    return this.usersProfileRepository.findOne({ where: { userId } });
  }

  findOne(id: number): Promise<UserProfile> {
    return this.usersProfileRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersProfileRepository.delete(id);
  }

  async create(userData: RegisterUserDto, userId: number) {
    const userProfile = new UserProfile();

    userProfile.fullName = userData.fullName;
    userProfile.userId = userId;

    return this.usersProfileRepository.save(userProfile);
  }

  async update(profileData: UpdateUserProfileDto, userId: number) {
    const userProfile = await this.usersProfileRepository.findOne({
      where: { userId },
    });

    if (!userProfile) {
      throw new BadRequestException("Profile doesn't exists");
    }

    userProfile.fullName = profileData.fullName;
    userProfile.currentPositionId = profileData.currentPositionId;
    userProfile.targetPositionId = profileData.targetPositionId;
    userProfile.languageId = profileData.languageId;

    return this.usersProfileRepository.save(userProfile);
  }
}
