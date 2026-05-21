import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class AdminReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(options: {
    skip?: number;
    take?: number;
    productId?: string;
    isHidden?: boolean;
  }) {
    const where: any = {};

    if (options.productId) {
      where.productId = options.productId;
    }

    if (options.isHidden !== undefined) {
      where.isHidden = options.isHidden;
    }

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where,
        skip: options.skip || 0,
        take: options.take || 20,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.review.count({ where }),
    ]);

    return {
      items: reviews,
      total,
      skip: options.skip || 0,
      take: options.take || 20,
    };
  }

  async getById(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        product: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async updateVisibility(id: string, isHidden: boolean) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return this.prisma.review.update({
      where: { id },
      data: { isHidden },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.prisma.review.delete({
      where: { id },
    });

    return { message: 'Review deleted successfully' };
  }
}
