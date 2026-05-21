import { BadRequestException, Controller, Get } from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { AnalyticsService } from './analytics.service';

@Controller('user/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  async summary(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }

    return this.analyticsService.getSummary(authUser.userId);
  }

  @Get('trends')
  async trends(@CurrentUser() authUser: AuthUser) {
    if (!authUser.userId) {
      throw new BadRequestException('Authorization header is required');
    }

    return this.analyticsService.getTrends(authUser.userId);
  }
}
