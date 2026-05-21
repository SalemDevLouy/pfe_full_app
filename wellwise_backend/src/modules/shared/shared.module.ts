import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [CategoriesModule, ProductsModule, SearchModule],
  controllers: [],
  providers: [],
  exports: [CategoriesModule, ProductsModule, SearchModule],
})
export class SharedModule {}
