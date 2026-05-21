import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class AdminProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(options: {
    skip?: number;
    take?: number;
    status?: string;
  }) {
    const where: any = {};

    if (options.status) {
      where.status = options.status;
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
          images: true,
          _count: {
            select: {
              reviews: true,
              cartItems: true,
              orderItems: true,
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
        },
        _count: {
          select: {
            reviews: true,
            cartItems: true,
            orderItems: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(dto: CreateProductDto) {
    if (!dto.name || !dto.slug || !dto.price) {
      throw new BadRequestException('name, slug, and price are required');
    }

    const existingSlug = await this.prisma.product.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new BadRequestException('Slug already exists');
    }

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        sku: dto.sku,
        price: dto.price,
        currency: dto.currency || 'USD',
        stock: dto.stock || 0,
        featured: dto.featured || false,
        trending: dto.trending || false,
        status: 'DRAFT',
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Add categories if provided
    if (dto.categoryIds && dto.categoryIds.length > 0) {
      await Promise.all(
        dto.categoryIds.map((categoryId) =>
          this.prisma.productCategory.create({
            data: {
              productId: product.id,
              categoryId,
            },
          }),
        ),
      );
    }

    return this.getById(product.id);
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check slug uniqueness if changing
    if (dto.slug && dto.slug !== product.slug) {
      const existingSlug = await this.prisma.product.findUnique({
        where: { slug: dto.slug },
      });
      if (existingSlug) {
        throw new BadRequestException('Slug already exists');
      }
    }

    const updated = await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        sku: dto.sku,
        price: dto.price,
        currency: dto.currency,
        stock: dto.stock,
        featured: dto.featured,
        trending: dto.trending,
        status: dto.status,
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Update categories if provided
    if (dto.categoryIds) {
      await this.prisma.productCategory.deleteMany({
        where: { productId: id },
      });

      await Promise.all(
        dto.categoryIds.map((categoryId) =>
          this.prisma.productCategory.create({
            data: {
              productId: id,
              categoryId,
            },
          }),
        ),
      );
    }

    return this.getById(id);
  }

  async delete(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Product deleted successfully' };
  }
}
