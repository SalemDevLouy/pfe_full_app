import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { AdminReviewsService } from './admin-reviews.service';
import { UpdateReviewVisibilityDto } from './dto/update-review-visibility.dto';

@Controller('admin/reviews')
export class AdminReviewsController {
  constructor(private readonly reviewsService: AdminReviewsService) {}

  @Get()
  async list(
    @CurrentUser() authUser: AuthUser,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('productId') productId?: string,
    @Query('isHidden') isHidden?: string,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reviewsService.list({
      skip: skip ? parseInt(String(skip), 10) : 0,
      take: take ? parseInt(String(take), 10) : 20,
      productId,
      isHidden: isHidden === 'true',
    });
  }

  @Get(':id')
  async getById(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reviewsService.getById(id);
  }

  @Patch(':id/visibility')
  async updateVisibility(
    @CurrentUser() authUser: AuthUser,
    @Param('id') id: string,
    @Body() dto: UpdateReviewVisibilityDto,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reviewsService.updateVisibility(id, dto.isHidden);
  }

  @Delete(':id')
  async delete(@CurrentUser() authUser: AuthUser, @Param('id') id: string) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.reviewsService.delete(id);
  }
}
