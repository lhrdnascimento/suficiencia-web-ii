import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'lhrdnascimento@furb.br' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '102030' })
  @IsNotEmpty()
  password!: string;
}


