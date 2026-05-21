import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(options: {
    query: string;
    type?: string;
    skip?: number;
    take?: number;
  }) {
    const { query, type, skip = 0, take = 20 } = options;

    if (!query || query.trim().length === 0) {
      return {
        products: [],
        categories: [],
        total: 0,
      };
    }

    const searchTerm = `%${query}%`;

    const [products, categories] = await Promise.all([
      type !== 'categories'
        ? this.prisma.product.findMany({
            where: {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
              status: 'ACTIVE',
            },
            skip,
            take,
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
              images: {
                take: 1,
              },
              _count: {
                select: {
                  reviews: true,
                },
              },
            },
          })
        : [],
      type !== 'products'
        ? this.prisma.category.findMany({
            where: {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
              ],
            },
            skip,
            take,
          })
        : [],
    ]);

    return {
      products,
      categories,
      total: products.length + categories.length,
      query,
    };
  }

  async searchProducts(query: string, skip: number = 0, take: number = 20) {
    if (!query || query.trim().length === 0) {
      return {
        items: [],
        total: 0,
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { sku: { contains: query, mode: 'insensitive' } },
          ],
          status: 'ACTIVE',
        },
        skip,
        take,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 3,
          },
          _count: {
            select: {
              reviews: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.product.count({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { sku: { contains: query, mode: 'insensitive' } },
          ],
          status: 'ACTIVE',
        },
      }),
    ]);

    return {
      items,
      total,
      skip,
      take,
    };
  }

  async searchCategories(query: string, skip: number = 0, take: number = 20) {
    if (!query || query.trim().length === 0) {
      return {
        items: [],
        total: 0,
      };
    }

    const [items, total] = await Promise.all([
      this.prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } },
          ],
        },
        skip,
        take,
      }),
      this.prisma.category.count({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { slug: { contains: query, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    return {
      items,
      total,
      skip,
      take,
    };
  }
}
