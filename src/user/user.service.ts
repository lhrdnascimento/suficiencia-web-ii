import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDao } from './user.dao';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) { }

  async registerUser(dto: RegisterUserDto): Promise<User> {
    const existing = await this.userDao.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email já cadastrado');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.userDao.createAndSave({ email: dto.email, passwordHash });
  }

  async validateUserCredentials(email: string, password: string): Promise<User> {
    const user = await this.userDao.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.userDao.findById(id);
  }
}
