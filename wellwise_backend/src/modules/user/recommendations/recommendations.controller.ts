import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import type { AuthUser } from '../../../common/decorators/auth-user.decorator';
import { CurrentUser } from '../../../common/decorators/auth-user.decorator';
import { AuthService } from '../../auth/auth.service';
import { RecommendationsService } from './recommendations.service';

@Controller('user/recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
    private readonly authService: AuthService,
  ) {}

  private resolveUserId(authUser: AuthUser): string {
    const userId = this.authService.getSessionUserId(authUser.userId);
    if (!userId) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    return userId;
  }

  /** GET /user/recommendations/for-you */
  @Get('for-you')
  forYou(
    @CurrentUser() authUser: AuthUser,
    @Query('limit') limit?: string,
  ) {
    const userId = this.resolveUserId(authUser);
    return this.recommendationsService.forYou(userId, limit ? parseInt(limit, 10) : 10);
  }

  /** GET /user/recommendations/categories */
  @Get('categories')
  categories(
    @CurrentUser() authUser: AuthUser,
    @Query('limit') limit?: string,
  ) {
    const userId = this.resolveUserId(authUser);
    return this.recommendationsService.categories(userId, limit ? parseInt(limit, 10) : 5);
  }

  /** GET /user/recommendations/goal-based */
  @Get('goal-based')
  goalBased(
    @CurrentUser() authUser: AuthUser,
    @Query('limit') limit?: string,
  ) {
    const userId = this.resolveUserId(authUser);
    return this.recommendationsService.goalBased(userId, limit ? parseInt(limit, 10) : 10);
  }

  /** GET /user/recommendations/new-arrivals */
  @Get('new-arrivals')
  newArrivals(
    @CurrentUser() authUser: AuthUser,
    @Query('limit') limit?: string,
  ) {
    // new-arrivals works for unauthenticated users too; best-effort userId
    let userId: string | undefined;
    try {
      userId = this.resolveUserId(authUser);
    } catch {
      userId = undefined;
    }
    return this.recommendationsService.newArrivals(userId, limit ? parseInt(limit, 10) : 10);
  }

  /** GET /user/recommendations/similar/:productId */
  @Get('similar/:productId')
  similar(
    @Param('productId') productId: string,
    @Query('limit') limit?: string,
  ) {
    if (!productId) {
      throw new BadRequestException('productId is required');
    }
    return this.recommendationsService.similar(productId, limit ? parseInt(limit, 10) : 5);
  }

  /** GET /user/recommendations/frequently-bought-together/:productId */
  @Get('frequently-bought-together/:productId')
  frequentlyBoughtTogether(
    @Param('productId') productId: string,
    @Query('limit') limit?: string,
  ) {
    if (!productId) {
      throw new BadRequestException('productId is required');
    }
    return this.recommendationsService.frequentlyBoughtTogether(
      productId,
      limit ? parseInt(limit, 10) : 5,
    );
  }

  /** GET /user/recommendations/cross-sell/:productId */
  @Get('cross-sell/:productId')
  crossSell(
    @CurrentUser() authUser: AuthUser,
    @Param('productId') productId: string,
    @Query('limit') limit?: string,
  ) {
    if (!productId) {
      throw new BadRequestException('productId is required');
    }
    let userId: string | undefined;
    try {
      userId = this.resolveUserId(authUser);
    } catch {
      userId = undefined;
    }
    return this.recommendationsService.crossSell(
      productId,
      userId,
      limit ? parseInt(limit, 10) : 5,
    );
  }
}
