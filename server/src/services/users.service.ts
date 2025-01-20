import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { isUUID } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dtos/request/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(dto: SignUpUserDto): Promise<User> {
    const user = this.repository.create(dto);
    return await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    if (!isUUID(id)) {
      throw new BadRequestException('Id is not UUID');
    }
    return await this.repository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }

  async update(
    id: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User does not Exist');
    }

    Object.assign(user, updateUserDto);
    return await this.repository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new BadRequestException('User does not Exist');
    }

    await this.repository.remove(user);
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const refreshTokenExp = new Date();
    refreshTokenExp.setDate(refreshTokenExp.getDate() + 7); // 7일 후 만료

    await this.repository.update(
      { id: userId },
      {
        refreshToken,
        refreshTokenExp,
      },
    );
  }

  async removeRefreshToken(userId: string): Promise<void> {
    await this.repository.update(
      { id: userId },
      {
        refreshToken: null,
        refreshTokenExp: null,
      },
    );
  }
}
