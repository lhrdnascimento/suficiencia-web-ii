import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDao } from './user.dao';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserDao],
  exports: [UserService, TypeOrmModule],
})
export class UserModule { }
