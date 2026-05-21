import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AuthService } from '../../auth/auth.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  private resolveUserId(accessToken: string): string {
    const userId = this.authService.getSessionUserId(accessToken);
    if (!userId) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    return userId;
  }

  async list(accessToken: string) {
    const userId = this.resolveUserId(accessToken);
    return this.prisma.review.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(accessToken: string, reviewId: string) {
    const userId = this.resolveUserId(accessToken);
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
      include: {
        product: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async create(accessToken: string, dto: CreateReviewDto) {
    const userId = this.resolveUserId(accessToken);

    if (!dto.productId) {
      throw new BadRequestException('productId is required');
    }

    if (!Number.isInteger(dto.rating) || dto.rating < 1 || dto.rating > 5) {
      throw new BadRequestException('rating must be an integer between 1 and 5');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingReview = await this.prisma.review.findFirst({
      where: {
        userId,
        productId: dto.productId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('You already reviewed this product');
    }

    return this.prisma.review.create({
      data: {
        userId,
        productId: dto.productId,
        rating: dto.rating,
        title: dto.title,
        comment: dto.comment,
      },
      include: {
        product: true,
      },
    });
  }

  async update(accessToken: string, reviewId: string, dto: UpdateReviewDto) {
    const userId = this.resolveUserId(accessToken);
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (dto.rating !== undefined && (!Number.isInteger(dto.rating) || dto.rating < 1 || dto.rating > 5)) {
      throw new BadRequestException('rating must be an integer between 1 and 5');
    }

    return this.prisma.review.update({
      where: { id: reviewId },
      data: {
        rating: dto.rating,
        title: dto.title,
        comment: dto.comment,
      },
      include: {
        product: true,
      },
    });
  }

  async delete(accessToken: string, reviewId: string) {
    const userId = this.resolveUserId(accessToken);
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    await this.prisma.review.delete({
      where: { id: reviewId },
    });

    return { message: 'Review deleted successfully' };
  }
}
