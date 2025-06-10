import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { REFRESH_TOKEN_NAME } from './constants/refresh-token-name.constant';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...loginResponse } =
      await this.authService.login(loginDto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return loginResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken, ...registerResponse } =
      await this.authService.register(registerDto);

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return registerResponse;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);

    return { message: 'Logged out successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/access-token')
  async getNewToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshTokenFromCookie = req.cookies[REFRESH_TOKEN_NAME] as string;

    if (!refreshTokenFromCookie) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { refreshToken, ...response } = await this.authService.getNewToken(
      refreshTokenFromCookie,
    );

    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response;
  }
}
