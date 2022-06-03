import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { RegisterUserDto } from '../auth/validation/RegisterUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(userData: RegisterUserDto) {
    const user = new User();
    user.password = userData.password;
    user.fullName = userData.fullName;
    user.email = userData.email;
    if (user.email) {
      const existingUser = await this.findOneByEmail(user.email);
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
    }
    return this.usersRepository.save(user);
  }

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      },
    );
  }
}
