import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class AdminCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(options: {
    skip?: number;
    take?: number;
  }) {
    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        skip: options.skip || 0,
        take: options.take || 20,
        include: {
          products: {
            select: {
              productId: true,
            },
          },
          _count: {
            select: {
              products: true,
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      this.prisma.category.count(),
    ]);

    return {
      items: categories,
      total,
      skip: options.skip || 0,
      take: options.take || 20,
    };
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(dto: CreateCategoryDto) {
    if (!dto.name || !dto.slug) {
      throw new BadRequestException('name and slug are required');
    }

    const existingSlug = await this.prisma.category.findUnique({
      where: { slug: dto.slug },
    });

    if (existingSlug) {
      throw new BadRequestException('Slug already exists');
    }

    const existingName = await this.prisma.category.findUnique({
      where: { name: dto.name },
    });

    if (existingName) {
      throw new BadRequestException('Name already exists');
    }

    return this.prisma.category.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
      },
    });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check slug uniqueness if changing
    if (dto.slug && dto.slug !== category.slug) {
      const existingSlug = await this.prisma.category.findUnique({
        where: { slug: dto.slug },
      });
      if (existingSlug) {
        throw new BadRequestException('Slug already exists');
      }
    }

    // Check name uniqueness if changing
    if (dto.name && dto.name !== category.name) {
      const existingName = await this.prisma.category.findUnique({
        where: { name: dto.name },
      });
      if (existingName) {
        throw new BadRequestException('Name already exists');
      }
    }

    return this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
      },
    });
  }

  async delete(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Check if category has products
    const productsCount = await this.prisma.productCategory.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      throw new BadRequestException(
        'Cannot delete category with products. Please reassign products first.',
      );
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return { message: 'Category deleted successfully' };
  }
}
