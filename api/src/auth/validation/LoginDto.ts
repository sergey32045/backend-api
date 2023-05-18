import { IsNotEmpty, MaxLength, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'test@mail.com',
    description: 'Email',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(200)
  email: string;

  @ApiProperty({ example: 'pswd', description: 'Password' })
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(6)
  password: string;
}
