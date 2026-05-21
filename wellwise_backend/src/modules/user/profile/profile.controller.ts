import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  BadRequestException,
} from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import {
  CurrentUser,
} from '../../../common/decorators/auth-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('user/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.profileService.getProfile(authUser.userId);
  }

  @Put()
  async updateProfile(
    @CurrentUser() authUser: AuthUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.profileService.updateProfile(authUser.userId, updateProfileDto);
  }

  @Put('password')
  async changePassword(
    @CurrentUser() authUser: AuthUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.profileService.changePassword(authUser.userId, changePasswordDto);
  }

  @Delete()
  async deleteAccount(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.profileService.deleteAccount(authUser.userId);
  }
}
