import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { HashingService } from 'src/common/hashing/hashing.service';
import { PayloadToken } from 'src/common/interfaces/payload-token.interface';
import { UserService } from 'src/user/user.service';

import { EXPIRES_DAY_REFRESH_TOKEN } from './constants/expires-day-refresh-token.constant';
import { REFRESH_TOKEN_NAME } from './constants/refresh-token-name.constant';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);

    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  async getNewToken(refreshToken: string) {
    const decodedToken: PayloadToken =
      await this.jwtService.verifyAsync(refreshToken);

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findById(decodedToken.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokens = this.issueToken(user.id);

    return { user, ...tokens };
  }

  private issueToken(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data);

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      workInterval: user.workInterval,
      breakInterval: user.breakInterval,
      intervalCount: user.intervalCount,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + EXPIRES_DAY_REFRESH_TOKEN);

    res.cookie(REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}
