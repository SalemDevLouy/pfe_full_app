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
import { AdminProductsService } from './admin-products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('admin/products')
export class AdminProductsController {
  constructor(private readonly productsService: AdminProductsService) {}

  @Get()
  async list(
    @CurrentUser() authUser: AuthUser,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('status') status?: string,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.productsService.list({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
      status,
    });
  }

  @Get(':id')
  async getById(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.productsService.getById(id);
  }

  @Post()
  async create(
    @CurrentUser() authUser: AuthUser,
    @Body() dto: CreateProductDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.productsService.create(dto);
  }

  @Patch(':id')
  async update(
    @CurrentUser() authUser: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.productsService.delete(id);
  }
}
