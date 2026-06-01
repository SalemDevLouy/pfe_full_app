import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async list(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('featured') featured?: string,
    @Query('trending') trending?: string,
    @Query('id') id?: string,
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.productsService.list({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
      featured: featured === 'true',
      trending: trending === 'true',
      id,
      search: search || undefined,
      category: category || undefined,
    });
  }

  @Get('trending')
  async getTrending(@Query('take') take?: number) {
    return this.productsService.getTrending(take ? parseInt(String(take), 10) : 10);
  }

  @Get('featured')
  async getFeatured(@Query('take') take?: number) {
    return this.productsService.getFeatured(take ? parseInt(String(take), 10) : 10);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.productsService.getBySlug(slug);
  }
}
