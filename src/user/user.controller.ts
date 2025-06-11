import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  profile(@CurrentUser('id') id: string) {
    return this.userService.profile(id);
  }

  @Auth()
  @HttpCode(HttpStatus.OK)
  @Patch('profile')
  updateProfile(
    @CurrentUser('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(id, updateUserDto);
    return this.userService.updateProfile(id, updateUserDto);
  }
}
