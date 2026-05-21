import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(skip?: number, take?: number) {
    return this.prisma.category.findMany({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
      include: {
        products: {
          select: {
            productId: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
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
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async getBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
