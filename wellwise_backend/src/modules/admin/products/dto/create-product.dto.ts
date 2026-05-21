export class CreateProductDto {
  name!: string;
  slug!: string;
  description?: string;
  sku?: string;
  price!: number;
  currency?: string;
  stock?: number;
  featured?: boolean;
  trending?: boolean;
  categoryIds?: string[];
}
