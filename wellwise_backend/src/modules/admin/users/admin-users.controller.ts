import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { AdminUsersService } from './admin-users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly usersService: AdminUsersService) {}

  @Get()
  async list(
    @CurrentUser() authUser: AuthUser,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('search') search?: string,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.usersService.list({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
      search,
    });
  }

  @Get(':id')
  async getById(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.usersService.getById(id);
  }

  @Patch(':id')
  async update(
    @CurrentUser() authUser: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  async delete(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.usersService.delete(id);
  }
}
