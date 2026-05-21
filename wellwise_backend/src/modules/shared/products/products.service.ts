import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(options: {
    skip?: number;
    take?: number;
    featured?: boolean;
    trending?: boolean;
  }) {
    const where: any = {
      status: 'ACTIVE',
    };

    if (options.featured) {
      where.featured = true;
    }

    if (options.trending) {
      where.trending = true;
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          images: {
            orderBy: { sortOrder: 'asc' },
          },
          _count: {
            select: {
              reviews: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items: products,
      total,
      skip: options.skip || 0,
      take: options.take || 20,
    };
  }

  async getTrending(take: number) {
    return this.prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        trending: true,
      },
      take,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getFeatured(take: number) {
    return this.prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        featured: true,
      },
      take,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
