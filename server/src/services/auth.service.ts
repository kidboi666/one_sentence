import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { SignUpUserDto } from '../dtos/request/sign-up-user.dto';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from '../dtos/response/sign-in-response.dto';
import { SignInUserDto } from '../dtos/request/sign-in-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: SignInUserDto): Promise<User> {
    const { email, password } = dto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('password is incorrect');
    }

    return user;
  }

  async signUp(dto: SignUpUserDto): Promise<User> {
    const { email, password } = dto;
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    return await this.usersService.create({ email, password: result });
  }

  async signIn(dto: SignInUserDto): Promise<SignInResponseDto> {
    const user = await this.validateUser(dto);
    const payload = { sub: user.id, username: user.email };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET_KEY,
    });

    await this.usersService.saveRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(payload.sub);
      if (
        !user ||
        user.refreshToken !== refreshToken ||
        user.refreshTokenExp < new Date()
      ) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });

      return {
        accessToken: newAccessToken,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.usersService.removeRefreshToken(userId);
  }
}
