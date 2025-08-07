import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'lhrdnascimento@furb.br' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '102030', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}


