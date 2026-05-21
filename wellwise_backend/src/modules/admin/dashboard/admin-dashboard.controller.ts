import {
  Controller,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { AdminDashboardService } from './admin-dashboard.service';

@Controller('admin/dashboard')
export class AdminDashboardController {
  constructor(private readonly dashboardService: AdminDashboardService) {}

  @Get('stats')
  async getStats(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.dashboardService.getStats();
  }

  @Get('revenue')
  async getRevenue(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.dashboardService.getRevenue();
  }

  @Get('recent-orders')
  async getRecentOrders(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.dashboardService.getRecentOrders();
  }

  @Get('top-products')
  async getTopProducts(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }
    return this.dashboardService.getTopProducts();
  }
}
