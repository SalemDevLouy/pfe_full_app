import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { AdminCategoriesService } from './admin-categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('admin/categories')
export class AdminCategoriesController {
  constructor(private readonly categoriesService: AdminCategoriesService) {}

  @Get()
  async list(
    @CurrentUser() authUser: AuthUser,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.categoriesService.list({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
    });
  }

  @Get(':id')
  async getById(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.categoriesService.getById(id);
  }

  @Post()
  async create(
    @CurrentUser() authUser: AuthUser,
    @Body() dto: CreateCategoryDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.categoriesService.create(dto);
  }

  @Patch(':id')
  async update(
    @CurrentUser() authUser: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.categoriesService.update(id, dto);
  }

  @Delete(':id')
  async delete(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.categoriesService.delete(id);
  }
}
