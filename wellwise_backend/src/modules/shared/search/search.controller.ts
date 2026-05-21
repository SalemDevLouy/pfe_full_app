import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Query('q') query: string,
    @Query('type') type?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.searchService.search({
      query,
      type,
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
    });
  }

  @Get('products')
  async searchProducts(
    @Query('q') query: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.searchService.searchProducts(
      query,
      skip ? parseInt(String(skip), 10) : 0,
      take ? parseInt(String(take), 10) : 20,
    );
  }

  @Get('categories')
  async searchCategories(
    @Query('q') query: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.searchService.searchCategories(
      query,
      skip ? parseInt(String(skip), 10) : 0,
      take ? parseInt(String(take), 10) : 20,
    );
  }
}
