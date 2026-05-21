import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { AdminAnalyticsService } from './admin-analytics.service';

@Controller('admin/analytics')
export class AdminAnalyticsController {
  constructor(private readonly analyticsService: AdminAnalyticsService) {}

  @Get('user-growth')
  async getUserGrowth(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.analyticsService.getUserGrowth();
  }

  @Get('order-trends')
  async getOrderTrends(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.analyticsService.getOrderTrends();
  }

  @Get('product-performance')
  async getProductPerformance(
    @CurrentUser() authUser: AuthUser,
    @Query('take') take?: number,
  ) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.analyticsService.getProductPerformance(take ? parseInt(String(take), 10) : 20);
  }

  @Get('category-stats')
  async getCategoryStats(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.analyticsService.getCategoryStats();
  }
}
