import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async list(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.categoriesService.list(skip, take);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoriesService.getById(id);
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoriesService.getBySlug(slug);
  }
}
