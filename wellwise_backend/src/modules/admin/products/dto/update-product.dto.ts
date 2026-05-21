export class UpdateProductDto {
  name?: string;
  slug?: string;
  description?: string;
  sku?: string;
  price?: number;
  currency?: string;
  stock?: number;
  featured?: boolean;
  trending?: boolean;
  status?: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  categoryIds?: string[];
}
